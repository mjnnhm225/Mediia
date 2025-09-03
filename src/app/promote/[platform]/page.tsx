"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlatformIcon } from "@/components/promote/platform-icon";
import { ArrowLeft, Coins, Heart, MessageSquare, Share2, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckOrdersDialog } from "@/components/promote/check-orders-dialog";
import { BuyPointsDialog } from "@/components/promote/buy-points-dialog";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import type { User } from "firebase/auth";

type PromotionActionType = "follow" | "like" | "comment" | "share";

type PromotionAction = {
    name: string;
    type: PromotionActionType;
    points: number;
    icon: React.ReactNode;
};

const earnActions: PromotionAction[] = [
    { name: "تابع حساب", type: "follow", points: 10, icon: <UserPlus className="size-5" /> },
    { name: "إعجاب بمنشور", type: "like", points: 5, icon: <Heart className="size-5" /> },
    { name: "تعليق على منشور", type: "comment", points: 20, icon: <MessageSquare className="size-5" /> },
    { name: "مشاركة منشور", type: "share", points: 30, icon: <Share2 className="size-5" /> },
];

const mockPromotionTargets: Record<string, Record<PromotionActionType, string[]>> = {
    tiktok: {
        follow: ["https://www.tiktok.com/@tiktok", "https://www.tiktok.com/@khaby.lame"],
        like: ["https://www.tiktok.com/@tiktok/video/7380146938953927982"],
        comment: ["https://www.tiktok.com/@tiktok/video/7380146938953927982"],
        share: ["https://www.tiktok.com/@tiktok/video/7380146938953927982"],
    },
    instagram: {
        follow: ["https://www.instagram.com/instagram"],
        like: ["https://www.instagram.com/p/C-c5g5yM5M5/"],
        comment: ["https://www.instagram.com/p/C-c5g5yM5M5/"],
        share: ["https://www.instagram.com/p/C-c5g5yM5M5/"],
    },
    facebook: {
        follow: ["https://www.facebook.com/facebook"],
        like: ["https://www.facebook.com/facebook/posts/10160297340072179"],
        comment: ["https://www.facebook.com/facebook/posts/10160297340072179"],
        share: ["https://www.facebook.com/facebook/posts/10160297340072179"],
    },
    likee: {
        follow: ["https://likee.video/@likee_official"],
        like: ["https://likee.video/v/8P1t1T"],
        comment: ["https://likee.video/v/8P1t1T"],
        share: ["https://likee.video/v/8P1t1T"],
    },
    twitter: {
        follow: ["https://x.com/x"],
        like: ["https://x.com/x/status/1803840332859551847"],
        comment: ["https://x.com/x/status/1803840332859551847"],
        share: ["https://x.com/x/status/1803840332859551847"],
    },
};

type PromotionType = {
    name: string;
    href: string;
    icon: React.ReactNode;
};

export default function PlatformPromotionPage({ params }: { params: { platform: string } }) {
    const { platform } = params;
    const router = useRouter();
    const { toast } = useToast();
    const [points, setPoints] = useState(1250);
    const [isClient, setIsClient] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);

    useEffect(() => {
        setIsClient(true);
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            if (!currentUser) {
                // If user is not logged in, redirect them to auth page
                // This is an extra check in case they land here directly
            }
        });
        return () => unsubscribe();
    }, []);

    const handleEarnPoints = (action: PromotionAction) => {
        const platformTargets = mockPromotionTargets[platform.toLowerCase()];
        if (!platformTargets) {
            toast({
                title: "خطأ",
                description: "لا توجد مهام لهذه المنصة.",
                variant: "destructive"
            });
            return;
        }

        const allTargets = platformTargets[action.type] || [];
        const availableTargets = allTargets.filter(target => !completedTasks.includes(target));

        if (availableTargets.length === 0) {
            toast({
                title: "لا توجد مهام جديدة",
                description: "لقد أكملت جميع المهام المتاحة لهذا النوع. حاول مرة أخرى لاحقًا.",
                variant: "destructive"
            });
            return;
        }

        const randomTarget = availableTargets[Math.floor(Math.random() * availableTargets.length)];

        window.open(randomTarget, "_blank");

        // Optimistically update state
        const newPoints = points + action.points;
        setPoints(newPoints);
        setCompletedTasks(prev => [...prev, randomTarget]);

        toast({
            title: `تم كسب ${action.points} نقطة`,
            description: `لقد قمت بـ "${action.name}" بنجاح. رصيدك الآن ${newPoints} نقطة.`,
        });
    };
    
    const handlePromotionLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!user) {
            e.preventDefault();
            toast({
                title: "مطلوب تسجيل الدخول",
                description: "الرجاء تسجيل الدخول أو إنشاء حساب للوصول إلى هذه الصفحة.",
                variant: "destructive",
            });
            router.push('/auth');
        } else {
            router.push(href);
        }
    };


    const promotionTypes: PromotionType[] = [
        { name: "ترويج متابعين", href: `/promote/${platform}/followers`, icon: <UserPlus className="size-6" /> },
        { name: "ترويج إعجابات", href: `/promote/${platform}/likes`, icon: <Heart className="size-6" /> },
        { name: "ترويج تعليقات", href: `/promote/${platform}/comments`, icon: <MessageSquare className="size-6" /> },
        { name: "ترويج مشاركات", href: `/promote/${platform}/shares`, icon: <Share2 className="size-6" /> },
    ];
    
    const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <PlatformIcon platform={platform} className="size-10 md:size-12 text-primary" />
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                        ترويج حسابات {platformName}
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 p-2 px-4 rounded-full bg-secondary">
                        <Coins className="size-6 text-accent" />
                        <span className="text-lg font-semibold text-foreground w-20">
                            {isClient ? points.toLocaleString('ar') : '...'}
                        </span>
                    </div>
                     <Button asChild variant="outline" size="icon">
                        <Link href="/">
                            <ArrowLeft className="size-5" />
                        </Link>
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>اكسب نقاط مجانية</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <p className="text-muted-foreground">تابع حسابات أو قم بالإعجاب أو التعليق لكسب النقاط المجانية.</p>
                            {earnActions.map((action) => (
                                <Button 
                                    key={action.name} 
                                    variant="outline" 
                                    className="w-full justify-between p-6 text-base"
                                    onClick={() => handleEarnPoints(action)}
                                    disabled={!user && isClient}
                                >
                                    <div className="flex items-center gap-3">
                                        {action.icon}
                                        <span>{action.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-accent">
                                        <span>+{action.points}</span>
                                        <Coins className="size-5" />
                                    </div>
                                </Button>
                            ))}
                             {!user && isClient && (
                                <p className="text-center text-sm text-muted-foreground pt-2">
                                    يجب عليك <Link href="/auth" className="text-primary underline">تسجيل الدخول</Link> لكسب النقاط.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>اختر نوع الترويج الذي تريد</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {promotionTypes.map((type) => (
                                    <Link 
                                        key={type.name} 
                                        href={type.href} 
                                        onClick={(e) => handlePromotionLinkClick(e, type.href)}
                                        passHref
                                    >
                                        <div className="p-6 bg-secondary rounded-lg flex items-center gap-4 hover:bg-primary/20 transition-colors duration-300 h-full cursor-pointer">
                                            <div className="p-3 bg-background rounded-full text-primary">
                                                {type.icon}
                                            </div>
                                            <span className="text-lg font-semibold text-foreground">{type.name}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 mt-12">
                               <CheckOrdersDialog />
                               <BuyPointsDialog />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}                      passHref
                                    >
                                        <div className="p-6 bg-secondary rounded-lg flex items-center gap-4 hover:bg-primary/20 transition-colors duration-300 h-full cursor-pointer">
                                            <div className="p-3 bg-background rounded-full text-primary">
                                                {type.icon}
                                            </div>
                                            <span className="text-lg font-semibold text-foreground">{type.name}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 mt-12">
                               <CheckOrdersDialog />
                               <BuyPointsDialog />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
  }
