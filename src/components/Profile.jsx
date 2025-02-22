import React from "react";
import { useUser, useClerk } from "@clerk/clerk-react";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!user) {
    return <div className="text-center text-lg mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <div className="flex items-center space-x-4">
        <img
          src={user.imageUrl}
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-gray-600"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.fullName}</h2>
          <p className="text-gray-400">{user.primaryEmailAddress?.emailAddress}</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">User Details</h3>
        <p className="text-gray-400"><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
      <button
        onClick={() => signOut()}
        className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
