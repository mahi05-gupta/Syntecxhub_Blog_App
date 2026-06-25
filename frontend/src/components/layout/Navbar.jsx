import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout, login } = useAuth();

  const [open, setOpen] = useState(false);

  const accounts =
    JSON.parse(localStorage.getItem("accounts")) || [];

  const switchAccount = (acc) => {
    login(acc.token, acc.user);
    setOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-black text-white relative">

      {/* LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="font-bold text-xl cursor-pointer"
      >
        Blog
      </h1>

      {/* MENU */}
      <div className="flex items-center gap-6">

        <button
          onClick={() => {
            navigate("/");
            window.location.reload(); // 🔥 force full reset
          }}
          className="hover:text-gray-300"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/add")}
          className="hover:text-gray-300"
        >
          Add Post
        </button>

        {/* PROFILE */}
        <div className="relative">

          <button
            onClick={() => setOpen(!open)}
            className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center"
          >
            👤
          </button>

          {/* OVERLAY DROPDOWN */}
          {open && (
            <div className="fixed inset-0 z-50">

              {/* CLICK OUTSIDE AREA */}
              <div
                className="absolute inset-0"
                onClick={() => setOpen(false)}
              />

              {/* DROPDOWN BOX */}
              <div className="absolute right-6 top-14 w-72 bg-white text-black rounded shadow-lg">

                {/* USER INFO */}
                <div className="p-3 border-b">
                  <p className="font-semibold">
                    {user?.name || "User"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user?.email}
                  </p>
                </div>

                {/* SWITCH ACCOUNT */}
                <div className="border-b">
                  <p className="px-3 py-2 font-bold text-sm">
                    Switch Account
                  </p>

                  {accounts.filter(
                    (acc) =>
                      acc?.user?.email !== user?.email
                  ).length === 0 ? (
                    <p className="px-3 py-2 text-sm text-gray-500">
                      No other accounts found
                    </p>
                  ) : (
                    accounts
                      .filter(
                        (acc) =>
                          acc?.user?.email !== user?.email
                      )
                      .map((acc, i) => (
                        <button
                          key={i}
                          onClick={() => switchAccount(acc)}
                          className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100"
                        >
                          <span>👤</span>
                          <span>{acc?.user?.email}</span>
                        </button>
                      ))
                  )}
                </div>

                {/* ADD ACCOUNT */}
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/login");
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100"
                >
                  ➕ Add Account
                </button>

                {/* LOGOUT */}
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}