export function PostCard({ post }) {
  const formattedText = post.selftext.replace(/&#x200B;/g, "<br/>");

  return (
    <div className="text-white rounded-2xl shadow-md p-4 mb-4 border-2 border-dashed border-red-700 mx-3">
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-400 text-sm mb-4">
        Posted by {post.author.name} •{" "}
        {new Date(post.created_utc * 1000).toLocaleDateString()}
      </p>
      <p
        className="text-gray-300 mb-4"
        dangerouslySetInnerHTML={{ __html: formattedText }}
      ></p>

      {post.is_video && post.media?.reddit_video ? (
        <div className="w-auto flex justify-center">
          <video controls className="max-w-60 rounded-lg ">
            <source
              src={post.media.reddit_video.fallback_url}
              type="video/mp4"
            />
          </video>
        </div>
      ) : post.preview?.images ? (
        <div className="flex flex-wrap gap-2">
          {post.preview.images.map((img, index) => (
            <img
              key={index}
              src={img.source.url.replace("&amp;", "&")}
              alt="Post media"
              className="rounded-lg max-w-full"
            />
          ))}
        </div>
      ) : null}

      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-m">
          👍 {post.ups} | 👎 {post.downs}
        </span>
        <button className="text-blue-500 hover:underline">
          View Comments ({post.num_comments})
        </button>
      </div>
    </div>
  );
}
