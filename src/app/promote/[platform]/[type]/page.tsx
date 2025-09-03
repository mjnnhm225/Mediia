import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const promotionDetails = {
    followers: { title: "ترويج المتابعين", placeholder: "ادخل معرف حسابك | Username" },
    likes: { title: "ترويج الإعجابات", placeholder: "ادخل رابط المنشور" },
    comments: { title: "ترويج التعليقات", placeholder: "ادخل رابط المنشور" },
    shares: { title: "ترويج المشاركات", placeholder: "ادخل رابط المنشور" },
};

const quantities = ["50", "100", "200", "300", "500", "1000", "5000", "10000", "50000", "100000"];

export default function PromotionTypePage({ params }: { params: { platform: string; type: string } }) {
    const { platform, type } = params;
    const details = promotionDetails[type as keyof typeof promotionDetails] || { title: "ترويج", placeholder: "أدخل الرابط أو المعرف" };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
             <Card className="w-full max-w-2xl">
                <CardHeader>
                    <div className="flex items-center justify-between">
                         <CardTitle className="text-3xl font-bold text-primary">{details.title}</CardTitle>
                         <Button asChild variant="ghost" size="sm">
                            <Link href={`/promote/${platform}`} className="flex items-center gap-1">
                                <ArrowRight className="size-4" />
                                <span>رجوع</span>
                            </Link>
                         </Button>
                    </div>
                    <CardDescription>
                        أنت الآن في قسم {details.title}. املأ الحقول أدناه لبدء الترويج.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="space-y-2">
                             <Input 
                                type="text"
                                placeholder={details.placeholder}
                                className="h-12 text-lg"
                             />
                        </div>
                        <div className="space-y-2">
                             <Select dir="rtl">
                                <SelectTrigger className="h-12 text-lg">
                                    <SelectValue placeholder="اختر العدد من هنا" />
                                </SelectTrigger>
                                <SelectContent>
                                    {quantities.map(qty => (
                                        <SelectItem key={qty} value={qty}>{qty}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit" className="w-full h-12 text-lg font-bold bg-accent hover:bg-accent/90 text-accent-foreground">
                            بدء الترويج
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
               }
