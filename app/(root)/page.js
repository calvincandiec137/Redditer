import { PostCard } from "@/components/PostCard";
import { CommentsCard } from "@/components/CommentsCard";
import Snoowrap from "snoowrap";

const reddit = new Snoowrap({
  userAgent: "redditer", // Replace with your own user agent
  clientId: "tTLM9CkfApkpMAOP5XQgrg", // Found in Reddit Developer Apps
  clientSecret: "qjlV2cnDl5BBymDx7-WPXbtob6OKTw", // Found in Reddit Developer Apps
  username: "No_Face2114", // Your Reddit username
  password: "redditerapp", // Your Reddit password
});

const mockComments = [
  {
    author: "commenter1",
    body: "This is a comment.",
    upvotes: 20,
    downvotes: 3,
    createdAt: Date.now(),
    replies: [
      {
        author: "replyUser",
        body: "This is a reply to the comment.",
        upvotes: 5,
        downvotes: 0,
        createdAt: Date.now(),
        replies: [],
      },
    ],
  },
];

export default async function App() {
  const postID = "1irhv39";
  const post = await reddit.getSubmission(postID).fetch();
  return (
    <div className="w-3/4 min-h-lvh rounded-3xl mx-auto my-8 pt-3 bg-black">
      <PostCard post={post} />
      <div className="mt-6">
        {mockComments.map((comment, index) => (
          <CommentsCard key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
}
``;
