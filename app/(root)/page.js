import { SearchBar } from "@/components/SearchBar";
import { PostCard } from "@/components/PostCard";
import { CommentsList } from "@/components/CommentsList";
import Snoowrap from "snoowrap";

const reddit = new Snoowrap({
  userAgent: "redditer",
  clientId: "tTLM9CkfApkpMAOP5XQgrg",
  clientSecret: "qjlV2cnDl5BBymDx7-WPXbtob6OKTw",
  username: "No_Face2114",
  password: "redditerapp",
});

async function getRedditContent(url) {
  try {
    const postId = url.split("/comments/")[1]?.split("/")[0];
    if (!postId) throw new Error("Invalid Reddit URL");

    const post = await reddit.getSubmission(postId).fetch();
    const comments = await post.comments;

    const serializedPost = {
      id: post.id,
      title: post.title,
      author: {
        name: post.author?.name || "[deleted]",
      },
      selftext: post.selftext || "",
      score: post.score || 0,
      created: post.created_utc || 0,
      url: post.url || "",
      num_comments: post.num_comments || 0,
      subreddit: post.subreddit?.display_name || "",
    };

    const serializeComment = (comment) => {
      if (!comment) return null;
      return {
        id: comment.id || "",
        author: comment.author?.name || "[deleted]",
        body: comment.body || "",
        score: comment.score || 0,
        created: comment.created_utc || 0,
        replies: Array.isArray(comment.replies)
          ? comment.replies
              .map((reply) => serializeComment(reply))
              .filter(Boolean)
          : [],
      };
    };

    const serializedComments = comments
      .map((comment) => serializeComment(comment))
      .filter(Boolean);

    return {
      post: serializedPost,
      comments: serializedComments,
    };
  } catch (error) {
    console.error("Error fetching Reddit content:", error);
    return null;
  }
}

export default async function Page({ searchParams }) {
  const { search: redditUrl } = searchParams || {};

  const content = redditUrl ? await getRedditContent(redditUrl) : null;

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
      <SearchBar />
      {content ? (
        <div className="w-3/4 min-h-lvh rounded-3xl mx-auto my-8 pt-3 bg-black">
          <PostCard post={content.post} />
          <CommentsList comments={content.comments} />
        </div>
      ) : (
        <div className="text-center mt-8 text-gray-400">
          {redditUrl
            ? "Error loading Reddit content. Please check the URL and try again."
            : "Paste a Reddit post URL to view its content"}
        </div>
      )}
    </main>
  );
}
