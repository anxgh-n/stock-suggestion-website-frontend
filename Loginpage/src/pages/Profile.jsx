import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [backgroundColor] = useState(getRandomColor()); // Initialize only once

  const fetchUserData = async () => {
    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("token");
    const url = `http://localhost:7060/usercredentials/get-user-by-id/${username}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (err) {
      setError("Failed to fetch user data");
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const getCategory = (categoryId) => {
    switch (categoryId) {
      case "1":
        return "Beginner";
      case "2":
        return "Intermediate";
      case "3":
        return "Expert";
      default:
        return "Unknown";
    }
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color === "#FFFFFF" ? getRandomColor() : color;
  }

  const firstLetter = user.username.charAt(0).toUpperCase();

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      minHeight: "100vh",
      background: "#f0f2f5",
      zIndex: 1,
      paddingTop: "100px",
    },
    profileCard: {
      width: "350px",
      borderRadius: "30px",
      backgroundColor: "white",
      overflow: "hidden",
      textAlign: "center",
      padding: "20px",
      transition: "all 0.3s ease-in-out",
      transform: isHovered ? "translateY(-10px)" : "translateY(0)",
      boxShadow: isHovered
        ? "0 8px 12px rgba(0, 0, 0, 0.2)"
        : "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    profileHeader: {
      marginBottom: "20px",
    },
    profileImage: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontSize: "30px",
      fontWeight: "bold",
      margin: "0 auto",
      backgroundColor: backgroundColor, // Static color
    },
    profileName: {
      marginTop: "10px",
      fontSize: "30px",
      fontWeight: "600",
      color: "#333",
    },
    profileEmail: {
      color: "blue",
      fontSize: "17px",
      marginTop: "5px",
    },
    profileBody: {
      marginTop: "20px",
    },
    profileCategory: {
      fontSize: "20px",
      color: "black",
      fontWeight: "500",
    },
  };

  return (
    <div style={styles.container}>
      <div
        style={styles.profileCard}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={styles.profileHeader}>
          <div style={styles.profileImage}>{firstLetter}</div>
          <h4 style={styles.profileName}>{user.username}</h4>
          <p style={styles.profileEmail}>{user.email}</p>
        </div>

        <div style={styles.profileBody}>
          <p style={styles.profileCategory}>
            <strong>Category:</strong> {getCategory(user.categoryId)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
