import React from "react";
import Profile from "./Profile"; // Ensure the correct file path for Profile
import Watchlist from "./Watchlist"; // Ensure the correct file path for Watchlist
import ProfileHeader from "../components/ProfileHeader";

import hmabImage from "../Images/homeaboutBg.png";
const ProfilePage = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      minHeight: "100vh",
      background: "#f0f2f5",
      padding: "20px",
    },
    leftPane: {
      flex: "1 1 30%",
      marginRight: "20px",
    },
    rightPane: {
      flex: "1 1 70%",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <> 
    <ProfileHeader />
     <div style={styles.container}>
      {/* Left Pane: Profile */}
      <div style={styles.leftPane}>
        <Profile />
      </div>

      {/* Right Pane: Watchlist */}
      <div style={styles.rightPane}>
        <Watchlist />
      </div>
    </div>
    </>
   
  );
};

export default ProfilePage;
