import { FacebookIcon, InstagramIcon, LikeeIcon, TikTokIcon, XIcon } from "@/components/icons";
import { HelpCircle } from "lucide-react";

type PlatformIconProps = {
    platform: string;
    className?: string;
};

export const PlatformIcon = ({ platform, className }: PlatformIconProps) => {
    switch (platform.toLowerCase()) {
        case 'tiktok':
            return <TikTokIcon className={className} />;
        case 'instagram':
            return <InstagramIcon className={className} />;
        case 'facebook':
            return <FacebookIcon className={className} />;
        case 'likee':
            return <LikeeIcon className={className} />;
        case 'twitter':
            return <XIcon className={className} />;
        default:
            return <HelpCircle className={className} />;
    }
};
