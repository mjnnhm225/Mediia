"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signInWithEmail, signUpWithEmail } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock } from "lucide-react";
import Link from 'next/link';

export default function AuthPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAuthSuccess = (action: string) => {
        toast({
            title: `تم ${action} بنجاح`,
            description: "مرحباً بك!",
        });
        router.push('/');
    };

    const handleAuthError = (error: any, action: string) => {
        console.error(`Error ${action}: `, error);
        let description = `لم نتمكن من ${action}. يرجى المحاولة مرة أخرى.`;

        switch (error.code) {
            case 'auth/invalid-credential':
                description = "البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التأكد من البيانات والمحاولة مرة أخرى.";
                break;
            case 'auth/email-already-in-use':
                description = "هذا البريد الإلكتروني مستخدم بالفعل. يرجى تسجيل الدخول أو استخدام بريد إلكتروني آخر.";
                break;
            case 'auth/weak-password':
                description = "كلمة المرور ضعيفة جدًا. يجب أن تتكون من 6 أحرف على الأقل.";
                break;
            default:
                description = error.message;
        }

        toast({
            title: `حدث خطأ أثناء ${action}`,
            description: description,
            variant: "destructive",
        });
    };

    const validateInputs = () => {
        if (!email || !password) {
             toast({ title: "الرجاء إدخال البريد الإلكتروني وكلمة المرور", variant: "destructive"});
             return false;
        }
        if (password.length < 8) {
            toast({
                title: "كلمة المرور قصيرة جدًا",
                description: "يجب أن تتكون كلمة المرور من 8 أحرف أو أرقام على الأقل.",
                variant: "destructive"
            });
            return false;
        }
        return true;
    }
    
    const handleEmailSignUp = async () => {
        if (!validateInputs()) return;
        setIsLoading(true);
        try {
            await signUpWithEmail(email, password);
            handleAuthSuccess("إنشاء الحساب");
        } catch (error: any) {
            handleAuthError(error, "إنشاء الحساب");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailSignIn = async () => {
        if (!validateInputs()) return;
        setIsLoading(true);
        try {
            await signInWithEmail(email, password);
            handleAuthSuccess("تسجيل الدخول");
        } catch (error: any) {
            handleAuthError(error, "تسجيل الدخول");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-primary">تسجيل الدخول</CardTitle>
                    <CardDescription>
                        سجّل دخولك أو أنشئ حسابًا جديدًا للمتابعة
                    </CardDescription>
                </CardHeader>
                <CardContent>
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
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                            <Input 
                                type="password" 
                                placeholder="كلمة المرور" 
                                className="pl-10 h-12"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="text-sm">
                            <Link href="/auth/reset-password" className="font-medium text-primary hover:underline">
                                نسيت كلمة المرور؟
                            </Link>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                             <Button onClick={handleEmailSignIn} className="flex-1 h-11" disabled={isLoading}>
                                {isLoading ? 'جاري التحميل...' : 'تسجيل الدخول'}
                            </Button>
                            <Button onClick={handleEmailSignUp} variant="secondary" className="flex-1 h-11" disabled={isLoading}>
                                إنشاء حساب جديد
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
