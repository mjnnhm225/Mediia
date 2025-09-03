"use client";

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MenuSheet } from './menu-sheet';
import { useState } from 'react';

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-primary">ترويج برو</h1>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">فتح القائمة</span>
          </Button>
        </div>
      </header>
      <MenuSheet isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </>
  );
}
