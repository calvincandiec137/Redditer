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
    // Extract post ID from Reddit URL
    const postId = url.split("/comments/")[1]?.split("/")[0];
    if (!postId) throw new Error("Invalid Reddit URL");

    const post = await reddit.getSubmission(postId).fetch();
    const comments = await post.comments;

    // Serialize post data
    const serializedPost = {
      id: post.id,
      title: post.title,
      author: post.author.name,
      selftext: post.selftext,
      score: post.score,
      created: post.created_utc,
      url: post.url,
      num_comments: post.num_comments,
      subreddit: post.subreddit.display_name,
    };

    // Serialize comments
    const serializedComments = comments.map((comment) => ({
      id: comment.id,
      author: comment.author.name,
      body: comment.body,
      score: comment.score,
      created: comment.created_utc,
      replies: comment.replies ? serializeReplies(comment.replies) : [],
    }));

    return {
      post: serializedPost,
      comments: serializedComments,
    };
  } catch (error) {
    console.error("Error fetching Reddit content:", error);
    return null;
  }
}

// Helper function to serialize nested replies
function serializeReplies(replies) {
  if (!replies || !replies.length) return [];

  return replies.map((reply) => ({
    id: reply.id,
    author: reply.author.name,
    body: reply.body,
    score: reply.score,
    created: reply.created_utc,
    replies: reply.replies ? serializeReplies(reply.replies) : [],
  }));
}

export default async function Page({ searchParams }) {
  const redditUrl = searchParams.search;
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
