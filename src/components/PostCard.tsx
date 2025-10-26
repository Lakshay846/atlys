import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

interface Post {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  emoji: string;
  timestamp: string;
}

interface PostCardProps {
  post: Post;
  onAuthRequired: () => void;
}

export const PostCard = ({ post, onAuthRequired }: PostCardProps) => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const handleInteraction = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    addToast("feature not implemented yet");
  };

  return (
    <div className="bg-[#f7f7f7] rounded-lg shadow-sm p-3">
      <div>
        <div className="bg-white rounded-lg p-2">
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              post.author.name[0]
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{post.author.name}</span>
            <span className="text-xs text-gray-500">{post.timestamp}</span>
          </div>
        </div>

        <div className="flex-1">
          {/* Emoji and content */}
          <div className="flex gap-2 mt-2 mb-2 ml-2">
            <span className="text-xl">{post.emoji}</span>
            <p className="text-sm leading-relaxed text-gray-800">
              {post.content}
            </p>
          </div>

          </div>
          </div>

          {/* Interaction buttons */}
          <div className="flex gap-2 mt-1 ml-2">
            <button
              className="flex items-center gap-2 p-1 rounded hover:bg-gray-100"
              onClick={handleInteraction}
            >
              <Heart className="w-4 h-4" />
            </button>
            <button
              className="flex items-center gap-2 p-1 rounded hover:bg-gray-100"
              onClick={handleInteraction}
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <button
              className="flex items-center gap-2 p-1 rounded hover:bg-gray-100"
              onClick={handleInteraction}
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
      </div>
    </div>
  );
};
