import React from "react";

export function PostCard({ post }) {
  return (
    <div className="text-white rounded-2xl shadow-md p-4 mb-4 border-2 border-dashed border-red-700 mx-3">
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-400 text-sm mb-4">
        Posted by {post.author} • {new Date(post.createdAt).toLocaleString()}
      </p>
      <p className="text-gray-300 mb-4">{post.body}</p>
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">
          👍 {post.upvotes} | 👎 {post.downvotes}
        </span>
        <button className="text-blue-500 hover:underline">
          View Comments ({post.commentCount})
        </button>
      </div>
    </div>
  );
}
