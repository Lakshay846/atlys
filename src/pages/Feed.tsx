import { useState } from 'react';
import { Header } from '../components/Header';
import { PostEditor } from '../components/PostEditor';
import { PostCard } from '../components/PostCard';
import { AuthModal } from '../components/AuthModal';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface Post {
  id: string;
  author: {
    name: string;
  };
  content: string;
  emoji: string;
  timestamp: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: { name: 'Theresa Webb' },
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    emoji: '😊',
    timestamp: '5 mins ago',
  },
  {
    id: '2',
    author: { name: 'John Doe' },
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    emoji: '👍',
    timestamp: '6 mins ago',
  },
];

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();
  const { addToast } = useToast();

  const handlePublish = (content: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      author: { name: user }, // user is a string (email or username)
      content,
      emoji: '🎉',
      timestamp: 'Just now',
    };

    setPosts([newPost, ...posts]);
    addToast('Post published successfully!', 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthRequired = () => {
    setShowAuthModal(true);
    addToast('Please login to continue.', 'info');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <PostEditor
            onPublish={handlePublish}
            onAuthRequired={handleAuthRequired}
          />

          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onAuthRequired={handleAuthRequired}
              />
            ))}
          </div>
        </div>
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default Feed;
