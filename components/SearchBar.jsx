"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !link.trim().includes("reddit.com/r/") ||
      !link.includes("/comments/")
    ) {
      alert("Please enter a valid Reddit post URL");
      return;
    }

    const newSearchParams = new URLSearchParams();
    newSearchParams.set("search", link);

    window.location.href = `/?${newSearchParams.toString()}`;
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-12">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Paste the Reddit post URL (e.g., https://www.reddit.com/r/subreddit/comments/...)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full px-4 py-2 text-lg min-h-20 text-white bg-black border-2 border-dashed border-white rounded-2xl outline-none focus:outline-none focus:ring-0"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-8 -translate-y-1/2 text-gray-400 hover:text-white"
        >
          <Search size={25} />
        </button>
      </form>
    </div>
  );
}
