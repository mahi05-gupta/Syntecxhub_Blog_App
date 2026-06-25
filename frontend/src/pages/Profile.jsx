import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 px-3 py-1 bg-white shadow rounded hover:bg-gray-100"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      {/* PROFILE CARD */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center">

        <img
          src={
            user?.profilePic
              ? `http://localhost:5000${user.profilePic}`
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />

        <p className="font-semibold">
          Name: {user?.name}
        </p>

        <p className="text-gray-600">
          Email: {user?.email}
        </p>
      </div>

    </div>
  );
}