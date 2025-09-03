"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, DollarSign } from "lucide-react";

export function BuyPointsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground">شراء نقاط</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="size-6 text-accent" />
            شراء نقاط إضافية
          </DialogTitle>
          <DialogDescription>
            اختر الباقة المناسبة وأدخل معلومات الدفع الخاصة بك للمتابعة.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[1000, 5000, 10000, 25000, 50000, 100000].map(points => (
                    <Button key={points} variant="outline" className="flex-col h-20">
                        <span className="text-lg font-bold">{points.toLocaleString('ar')}</span>
                        <span className="text-xs text-muted-foreground">نقطة</span>
                    </Button>
                ))}
            </div>

            <div className="space-y-4">
                <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                    <Input id="card-number" placeholder="رقم البطاقة" className="pl-10 h-12" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <Input id="expiry-date" placeholder="تاريخ انتهاء الصلاحية (MM/YY)" className="h-12" />
                     <Input id="cvc" placeholder="CVC" className="h-12" />
                </div>
            </div>
        </div>
        <DialogFooter className="sm:justify-between gap-2">
           <DialogClose asChild>
            <Button type="button" variant="secondary">
              إلغاء
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            الدفع الآن
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
                          }
