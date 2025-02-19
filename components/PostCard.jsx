"use client";

import { useState } from "react";

export function PostCard({ post }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!post) return null;

  const processContent = (text) => {
    if (!text) return { cleanText: "", imageUrls: [], videoUrls: [] };

    const imageUrlRegex = /https:\/\/(preview|i)\.redd\.it\S+/g;
    const videoUrlRegex = /https:\/\/v\.redd\.it\S+/g;

    const imageUrls = text.match(imageUrlRegex) || [];
    const videoUrls = text.match(videoUrlRegex) || [];

    let cleanText = text.replace(imageUrlRegex, "").replace(videoUrlRegex, "");
    cleanText = cleanText
      .replace(/\*\*(\w+|\s+)\*\*/g, "<b>$1</b>")
      .replace(/\n/g, "<br/>")
      .replace(/\s+/g, " ")
      .trim();

    return { cleanText, imageUrls, videoUrls };
  };

  const { cleanText, imageUrls, videoUrls } = processContent(post.selftext);

  const getMediaContent = () => {
    const media = [];

    if (post.preview?.images) {
      post.preview.images.forEach((img) => {
        media.push({
          type: "image",
          url: img.source.url.replace(/&amp;/g, "&"),
        });
      });
    }

    if (post.url?.match(/\.(jpg|jpeg|png|gif)$/)) {
      media.push({ type: "image", url: post.url });
    }

    if (post.media?.reddit_video?.fallback_url) {
      media.push({ type: "video", url: post.media.reddit_video.fallback_url });
    }

    videoUrls.forEach((url) => {
      media.push({ type: "video", url });
    });

    return media;
  };

  const mediaContent = getMediaContent();

  const openImageModal = (url) => setSelectedImage(url);
  const closeImageModal = () => setSelectedImage(null);

  return (
    <div className="text-white rounded-2xl shadow-md p-4 mb-4 border-2 border-dashed border-red-700 mx-3">
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-400 text-sm mb-4">
        Posted by {post.author.name} •{" "}
        {new Date(post.created_utc * 1000).toLocaleDateString()}
      </p>

      {cleanText && cleanText.length > 0 && (
        <p
          className="text-gray-300 mb-4"
          dangerouslySetInnerHTML={{ __html: cleanText }}
        />
      )}

      {mediaContent.length > 0 && (
        <div className="flex flex-col items-center gap-4 mb-4">
          {mediaContent.map((media, index) => (
            <div key={index} className="w-3/4 flex justify-center">
              {media.type === "image" ? (
                <img
                  src={media.url}
                  alt={`Post content ${index + 1}`}
                  className="rounded-lg max-w-full h-auto cursor-pointer"
                  onClick={() => openImageModal(media.url)}
                  onError={(e) => (e.target.style.display = "none")}
                />
              ) : (
                <video controls className="rounded-lg max-w-full h-auto">
                  <source src={media.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeImageModal}
        >
          <img
            src={selectedImage}
            alt="Enlarged post content"
            className="max-w-full max-h-full"
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-m">
          👍 {post.ups} | 💬 {post.num_comments}
        </span>
      </div>
    </div>
  );
}
