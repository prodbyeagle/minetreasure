interface ReviewProps {
    text: string;
    username: string;
}

const Review = ({ text, username }: ReviewProps) => {
    return (
        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl">
            <p className="text-zinc-600 dark:text-zinc-400 italic">&quot;{text}&quot;</p>
            <p className="mt-4 font-semibold">- {username}</p>
        </div>
    );
}

export default Review;
