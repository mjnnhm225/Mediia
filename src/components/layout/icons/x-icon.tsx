import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const XIcon = ({ className }: { className?: string }) => (
    <X className={cn("size-6", className)} />
);
