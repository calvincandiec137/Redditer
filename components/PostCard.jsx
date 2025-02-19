"use client";

export function PostCard({ post }) {
  if (!post) return null;

  const processContent = (text) => {
    const imageUrlRegex = /https:\/\/preview\.redd\.it\S+/g;
    const imageUrls = text.match(imageUrlRegex) || [];

    let cleanText = text.replace(imageUrlRegex, "");
    cleanText = cleanText.replace(/\*\*(\w+|\s+)\*\*/g, "<b>$1</b>");
    cleanText = cleanText.replace(/\n/g, "<br/>");
    cleanText = cleanText.replace(/\s+/g, " ").trim();

    return {
      cleanText,
      imageUrls,
    };
  };

  const { cleanText, imageUrls } = processContent(post.selftext);

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

      {imageUrls.length > 0 && (
        <div className="flex flex-col items-center gap-4 mb-4">
          {imageUrls.map((url, index) => (
            <div key={index} className="w-3/4 flex justify-center">
              <img
                src={url.replace(/&amp;/g, "&")}
                alt={`Post image ${index + 1}`}
                className="rounded-lg max-w-full h-auto"
                onError={(e) => {
                  console.log(`Failed to load image: ${url}`);
                  e.target.style.display = "none";
                }}
              />
            </div>
          ))}
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
