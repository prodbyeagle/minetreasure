import type { ReviewProps } from "@/types/types";
import Image from 'next/image';

const Review = ({ text, username }: ReviewProps) => {
    return (
        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl">
            <p className="text-zinc-600 dark:text-zinc-400 italic mb-4">&quot;{text}&quot;</p>
            <div className="flex items-center gap-2">
                <Image 
                    width={30} 
                    height={30} 
                    src={`http://cravatar.eu/helmavatar/${username}.png`} 
                    alt={username} 
                    className="rounded-full" 
                />
                <span className="text-sm font-medium text-zinc-900 dark:text-white">@{username}</span>
            </div>
        </div>
    );
};

export default Review;
