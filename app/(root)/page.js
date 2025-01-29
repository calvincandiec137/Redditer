import { PostCard } from "@/components/PostCard";
import { CommentsCard } from "@/components/CommentsCard";
import getlink from "@/components/getlink";

const mockPost = {
  title: "This is a sample post",
  author: "exampleUser",
  body: "Here’s the body of the post.",
  upvotes: 123,
  downvotes: 10,
  createdAt: Date.now(),
  commentCount: 5,
};

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

export default async function App({ searchparams }) {
  return (
    <div className="w-3/4 min-h-lvh rounded-3xl mx-auto my-8 pt-3 bg-black">
      <PostCard post={mockPost} />
      <div className="mt-6">
        {mockComments.map((comment, index) => (
          <CommentsCard key={index} comment={comment} />
        ))}
      </div>
      <getlink />
    </div>
  );
}
