import React, { useEffect, useState } from "react";
import "./stylesheet/Profile.css";

const Profile = () => {

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }
  
   const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or error fetching profile");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="profile-container">
      <h2>Welcome, {profile.name}</h2>
      <p>Email: {profile.email}</p>
      {/* Other profile info */}
    </div>
  );
};


export default Profile;
