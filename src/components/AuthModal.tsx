import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { LogIn } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const { addToast } = useToast();

  if (!isOpen) return null;

  const handleClose = () => {
    setMode("signin");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsLoading(false);
    onClose();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signin") {
        login(email, password);
        addToast("Signed in successfully!", "success");
      } else {
        if (password !== confirmPassword) {
            addToast("Passwords do not match", "error");
            return;
        }
        else {
            signup(email, password);
            addToast("Account created successfully!", "success");
        }
      }

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      onClose();
    } catch (error) {
      addToast("Authentication failed. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
      <div className="p-2 bg-[#f7f7f7] rounded-2xl pb-6 animate-scale-in">
        <div className="bg-white rounded-lg w-[28em] max-w-md p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>

          <div className="flex items-center justify-center mb-4">
            <span className="w-10 h-10 rounded-full bg-[#f7f7f7] flex items-center justify-center">
              <LogIn className="w-5 h-5 text-gray-700" />
            </span>
          </div>

          <h2 className="text-2xl text-center font-semibold mb-1">
            {mode === "signin" ? "Sign in to continue" : "Create an account to continue"}
          </h2>
          <p className="text-sm text-center text-gray-600 mb-6">
            {mode === "signin"
              ? "Sign in to access all the features on this app"
              : "Create an account to access all the features on this app"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {mode === "signup" && (
              <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium">
                  Repeat password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded ${
                isLoading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              } bg-[#5057ea]`}
            >
              {isLoading
                ? "Loading..."
                : mode === "signin"
                ? "Sign In"
                : "Sign Up"}
            </button>
          </form>
        </div>
        <div className="text-center text-sm mt-4">
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-blue-500 hover:underline"
          >
            {mode === "signin"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};
