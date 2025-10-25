import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Header } from "../components/Header";
import { LogIn } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const success = login(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="p-4 bg-[#f7f7f7] rounded-2xl pb-6">
          <div className="w-full max-w-md p-6 bg-white shadow-md rounded-2xl w-[28em]">
            <div className="flex items-center justify-center mb-4">
              <span className="w-10 h-10 rounded-full bg-[#f7f7f7] flex items-center justify-center">
                <LogIn className="w-5 h-5 text-gray-700" />
              </span>
            </div>
            <h2 className="text-l font-bold text-center mb-2">
              Sign in
            </h2>
            <p className="text-sm text-center text-gray-600 mb-10 text-[#ababab]">
              Sign in to access all the features on this app
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 pt-8">
              <div>
                <label htmlFor="email" className="block mb-1 font-medium text-sm">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded-md text-md"
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-1 font-medium text-sm">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded-md !text-sm"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#5057ea] text-white py-2 rounded-lg transition-colors"
              >
                {isLoading ? "Loading..." : "Sign In"}
              </button>
            </form>
          </div>

          <div className="text-center text-sm mt-2">
            <button
              type="button"
              onClick={() => navigate("/signup")}
            >
              Don't have an account? <span className="text-blue-500 hover:underline">Sign up</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
