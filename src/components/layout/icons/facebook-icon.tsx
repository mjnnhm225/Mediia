import { Facebook } from "lucide-react";
import { cn } from "@/lib/utils";

export const FacebookIcon = ({ className }: { className?: string }) => (
    <Facebook className={cn("size-6", className)} />
);
