"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { sendPasswordReset } from '@/lib/firebase';
import { ArrowRight, Mail } from 'lucide-react';

export default function ResetPasswordPage() {
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handleResetPassword = async () => {
        if (!email) {
            toast({ title: "الرجاء إدخال بريدك الإلكتروني", variant: "destructive" });
            return;
        }

        setIsLoading(true);
        try {
            await sendPasswordReset(email);
            setIsEmailSent(true);
            toast({
                title: "تم إرسال البريد الإلكتروني",
                description: "لقد أرسلنا رابطًا لإعادة تعيين كلمة المرور إلى بريدك الإلكتروني.",
            });
        } catch (error: any) {
            console.error("Error sending password reset email: ", error);
            let description = "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.";
            if (error.code === 'auth/user-not-found') {
                description = "لا يوجد حساب مرتبط بهذا البريد الإلكتروني.";
            }
            toast({
                title: "خطأ في إرسال البريد",
                description: description,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-primary">إعادة تعيين كلمة المرور</CardTitle>
                    <CardDescription>
                        أدخل بريدك الإلكتروني لإرسال رابط إعادة التعيين
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isEmailSent ? (
                        <div className="text-center space-y-4">
                            <p className="text-foreground">
                                تم إرسال رابط إعادة تعيين كلمة المرور إلى <span className="font-bold text-primary">{email}</span>. يرجى التحقق من بريدك الوارد.
                            </p>
                            <Button asChild>
                                <Link href="/auth" className="flex items-center gap-2">
                                    <ArrowRight className="size-4" />
                                    <span>العودة إلى صفحة تسجيل الدخول</span>
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                                <Input 
                                    type="email" 
                                    placeholder="البريد الإلكتروني" 
                                    className="pl-10 h-12"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>

                            <Button onClick={handleResetPassword} className="w-full h-11" disabled={isLoading}>
                                {isLoading ? 'جاري الإرسال...' : 'إرسال رابط إعادة التعيين'}
                            </Button>
                            
                            <Button asChild variant="ghost" size="sm">
                                <Link href="/auth">
                                    العودة إلى تسجيل الدخول
                                </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
      }
