import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type BookCardProps = {
    id: string;
    title: string;
    author: string;
    imageUrl: string;
    isRTL?: boolean;
    downloadscount: number;
};

const BookCard: React.FC<BookCardProps> = ({ id, title, author, imageUrl, isRTL, downloadscount }) => {
    return (
        <Link href={`/books/${id}`}>
            <div
                className={cn(
                    "border border-border rounded-lg p-4 w-full max-w-100 shadow-sm bg-card hover:shadow-md transition-shadow duration-300 cursor-pointer",
                    isRTL && "text-right"
                )}
            >
                <div className="w-full aspect-3/4 overflow-hidden rounded-md mb-3 bg-muted">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                    {author}
                </p>
                <p className="text-lg font-bold text-primary mb-3">
                    {downloadscount} {isRTL ? "تحميلات" : "Downloads"}
                </p>
            </div>
        </Link>
    );
};

export default BookCard;