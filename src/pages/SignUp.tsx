import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Header } from "../components/Header";
import { LogIn } from "lucide-react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      addToast("Passwords do not match", "error");
      return;
    }

    setIsLoading(true);

    try {
      signup(email, password);
      addToast("Account created successfully!", "success");
      navigate("/"); 
    } catch (error) {
      addToast(
        error instanceof Error
          ? error.message
          : "Sign up failed. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center px-4">
      <div className="p-4 bg-[#f7f7f7] rounded-2xl pb-6">
        <div className="max-w-md bg-white p-6 rounded-2xl shadow-md w-[28em]">
        <div className="flex items-center justify-center mb-4">
              <span className="w-10 h-10 rounded-full bg-[#f7f7f7] flex items-center justify-center">
                <LogIn className="w-5 h-5 text-gray-700" />
              </span>
            </div>
          <h2 className="text-l text-center font-semibold mb-2">Create an account</h2>
          <p className="text-sm text-center text-[#ababab] mb-10">Create an account to access all the features on this app</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm pt-8 font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium mb-1"
              >
                Re-enter Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded-lg text-white bg-[#5057ea]`}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
        </div>
        <p className="text-center text-sm mt-2">
              Already have an account?
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </button>
            </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
