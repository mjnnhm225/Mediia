import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { TikTokIcon, InstagramIcon, FacebookIcon, LikeeIcon, XIcon } from '@/components/icons';

const platforms = [
  { name: 'تيك توك', href: '/promote/tiktok', icon: <TikTokIcon className="size-8" /> },
  { name: 'انستغرام', href: '/promote/instagram', icon: <InstagramIcon className="size-8" /> },
  { name: 'فيسبوك', href: '/promote/facebook', icon: <FacebookIcon className="size-8" /> },
  { name: 'لايكي', href: '/promote/likee', icon: <LikeeIcon className="size-8" /> },
  { name: 'تويتر', href: '/promote/twitter', icon: <XIcon className="size-8" /> },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight">
            مرحبا بك في PromotePro
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80 leading-relaxed">
            أفضل موقع لترويج المتابعين والإعجابات والتعليقات الحقيقية. في موقعنا، يمكنك ترويج أي حساب حقيقي بدون تعب. كل ما عليك هو اختيار التطبيق الذي تريد الترويج له.
          </p>
        </section>

        <section className="mt-12 md:mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {platforms.map((platform) => (
              <Card key={platform.name} className="bg-card border-border/50 hover:border-primary transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                <CardContent className="p-6 text-center">
