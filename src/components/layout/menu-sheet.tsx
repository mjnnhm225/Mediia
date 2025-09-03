import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { LogIn, Send, Youtube } from 'lucide-react';
import Link from 'next/link';

type MenuSheetProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function MenuSheet({ isOpen, onOpenChange }: MenuSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[80vw] sm:w-[50vw] md:w-[30vw] bg-card p-6 flex flex-col">
        <SheetHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="https://picsum.photos/120"
              alt="Profile"
              data-ai-hint="logo abstract"
              width={120}
              height={120}
              className="rounded-full border-4 border-primary"
            />
          </div>
          <SheetTitle className="text-2xl font-bold text-foreground">
            مرحباً بك في ترويج برو
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-6" />
        <div className="flex flex-col gap-4 flex-grow">
          <Button asChild variant="default" className="w-full justify-start gap-3 text-lg py-6 bg-primary/90 hover:bg-primary">
            <Link href="/auth">
              <LogIn className="size-5" />
              انشاء حساب / تسجيل الدخول
            </Link>
          </Button>
          <Button variant="secondary" className="w-full justify-start gap-3 text-lg py-6">
            <Send className="size-5" />
            قناة الموقع تليجرام
          </Button>
          <Button variant="secondary" className="w-full justify-start gap-3 text-lg py-6">
            <Youtube className="size-5" />
            قناة الموقع يوتيوب
          </Button>
        </div>
        <footer className="text-center text-muted-foreground text-sm mt-4">
            PromotePro &copy; {new Date().getFullYear()}
        </footer>
      </SheetContent>
    </Sheet>
  );
              }
