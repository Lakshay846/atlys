import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { LogIn, ToggleRight } from "lucide-react";

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthClick = () => {
    if (user) {
      logout();
      navigate("/");
    } else {
      navigate("/signin");
    }
  };

  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <header className="bg-card sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between px-4 py-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
            <ToggleRight />
          </div>
          <span className="text-sm font-semibold">foo-rum</span>
        </button>

        {/* Right button */}
        {isAuthPage ? (
          <button onClick={() => navigate("/")} className="gap-2">
            <span className="text-sm font-semibold">Back to home</span>
          </button>
        ) : (
          <button onClick={handleAuthClick} className="flex items-center gap-2">
            {user ? (
              "Logout"
            ) : (
              <>
                <span className="flex items-center gap-1 text-sm font-semibold">
                  Login <LogIn className="w-5 h-5" />
                </span>
              </>
            )}
          </button>
        )}
      </div>
    </header>
  );
};
