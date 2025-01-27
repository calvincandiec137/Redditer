"use client";

import React, { useState } from "react";

export function CommentsCard({ comment }) {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className=" mx-3 text-white border-l border-gray-600 shadow-sm p-3 mb-2">
      <p className="text-gray-300 text-sm mb-1">
        {comment.author} • {new Date(comment.createdAt).toLocaleString()}
      </p>
      <p className="text-gray-200 mb-2">{comment.body}</p>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>
          👍 {comment.upvotes} | 👎 {comment.downvotes}
        </span>
        {comment.replies?.length > 0 && (
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies
              ? "Hide Replies"
              : `View Replies (${comment.replies.length})`}
          </button>
        )}
      </div>
      {showReplies && (
        <div className="mt-3 pl-4 ">
          {comment.replies.map((reply, index) => (
            <CommentsCard key={index} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}
