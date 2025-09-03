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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const orders = [
    {
        id: '#12345',
        name: 'ترويج متابعين TikTok',
        current: 50,
        total: 200,
        progress: 25,
    },
    {
        id: '#67890',
        name: 'ترويج إعجابات Instagram',
        current: 500,
        total: 500,
        progress: 100,
    },
    {
        id: '#54321',
        name: 'ترويج مشاركات Facebook',
        current: 75,
        total: 100,
        progress: 75,
    },
];


export function CheckOrdersDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-1 text-lg py-6">فحص الطلبات</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>حالة طلباتك</DialogTitle>
          <DialogDescription>
            هنا يمكنك تتبع حالة طلبات الترويج الخاصة بك.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            {orders.length > 0 ? (
                orders.map((order, index) => (
                    <div key={order.id}>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-medium text-foreground">{order.name}</span>
                                <span className="text-muted-foreground">ID: {order.id}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-primary font-semibold">اكتمل {order.current} من {order.total}</span>
                                <span className="text-muted-foreground">{order.progress}%</span>
                            </div>
                            <Progress value={order.progress} className="w-full" />
                        </div>
                        {index < orders.length - 1 && <Separator className="mt-4" />}
                    </div>
                ))
            ) : (
                <p className="text-center text-muted-foreground">لا توجد طلبات حالية.</p>
            )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              إغلاق
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  }
