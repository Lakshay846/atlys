import { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Trash2,
  Plus,
  Send,
  Mic,
  Video,
  Smile,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

interface PostEditorProps {
  onPublish: (content: string) => void;
  onAuthRequired: () => void;
}

export const PostEditor = ({ onPublish, onAuthRequired }: PostEditorProps) => {
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const { addToast } = useToast();

  const handleNotImplemented = () => {
    addToast(`feature not implemented yet`);
  };

  const handleInteraction = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    handleNotImplemented();
  };

  const handlePublish = () => {
    if (!user) {
      onAuthRequired();
      return;
    }

    if (content.trim()) {
      onPublish(content);
      setContent("");
      addToast("Post published successfully!", "success");
    }
  };

  return (
    <div className="px-[0.5em] py-[0.5em] bg-[#f7f7f7] rounded-lg">
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <div className="flex items-center gap-3 px-[0.2em] py-[0.2em] bg-[#f7f7f7] rounded-md flex-wrap">
          <div onClick={() => handleInteraction()} className="flex items-center justify-between w-32 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer">
            <span>Paragraph</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => handleInteraction()}
              className="p-1 rounded hover:bg-gray-100"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleInteraction()}
              className="p-1 rounded hover:bg-gray-100"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleInteraction()}
              className="p-1 rounded hover:bg-gray-100"
            >
              <Underline className="w-4 h-4" />
            </button>
          </div>

          <div className="h-6 w-px bg-gray-300" />

          <div className="flex gap-1">
            <button
              onClick={() => handleInteraction()}
              className="p-1 rounded hover:bg-gray-100"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleInteraction()}
              className="p-1 rounded hover:bg-gray-100"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
          </div>

          <div className="h-6 w-px bg-gray-300" />

          <div className="flex gap-1">
            <button
              onClick={() => handleInteraction()}
              className="p-1 rounded hover:bg-gray-100"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleInteraction()}
              className="p-1 rounded hover:bg-gray-100"
            >
              <Code className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="ml-auto">
          <button
            onClick={() => handleInteraction()}
            className="p-1 text-red-500 rounded hover:bg-red-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-3">
        <div className="relative">
          <span onClick={() => handleInteraction()}><Smile className="w-5 h-5 absolute left-3 top-3 text-black-400"/></span>
          <textarea
            placeholder="How are you feeling today?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[120px] resize-none border p-2 pl-10 rounded text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => handleInteraction()}
            className="p-1 rounded hover:bg-gray-100"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleInteraction()}
            className="p-1 rounded hover:bg-gray-100"
          >
            <Mic className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleInteraction()}
            className="p-1 rounded hover:bg-gray-100"
          >
            <Video className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={handlePublish}
          disabled={!content.trim()}
          className={`flex items-center gap-2 p-2 rounded`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
    </div>
  );
};
