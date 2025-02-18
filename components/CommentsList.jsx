"use client";

import { CommentsCard } from "@/components/CommentsCard";

export function CommentsList({ comments }) {
  if (!comments || comments.length === 0) {
    return (
      <div className="mt-6 text-center text-gray-400">
        No comments found for this post.
      </div>
    );
  }

  return (
    <div className="mt-6">
      {comments.map((comment) => (
        <CommentsCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
