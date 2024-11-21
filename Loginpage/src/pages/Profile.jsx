import React, { useEffect, useState } from "react";
import axios from "axios"; // We will use axios to make HTTP requests

const Profile = () => {
  // Define state variables
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch user data
  const fetchUserData = async () => {
    const username = sessionStorage.getItem('username');
    const token = sessionStorage.getItem('token');
    const url = `http://localhost:7060/usercredentials/get-user-by-id/${username}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data); // Store the user data in state
    } catch (err) {
      setError("Failed to fetch user data");
      console.error("Error fetching user data:", err);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Check if user data is available
  if (!user) {
    return <div>Loading...</div>;
  }

  // Determine category based on categoryId
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

  // Generate random background color (excluding white)
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color === "#FFFFFF" ? getRandomColor() : color;
  };

  const backgroundColor = getRandomColor();
  const firstLetter = user.username.charAt(0).toUpperCase(); // Get the first letter of the username

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start', // Align to the top of the viewport
      minHeight: '100vh',
      background: '#f0f2f5',
      paddingTop: '50px', // This will move the card upwards a little bit
    },
    profileCard: {
      width: '350px',
      borderRadius: '10px',
      backgroundColor: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      textAlign: 'center',
      padding: '20px',
      transition: 'all 0.3s ease-in-out',
    },
    profileCardHover: {
      transform: 'translateY(-10px)',
      boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
    },
    profileHeader: {
      marginBottom: '20px',
    },
    profileImage: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: '30px',
      fontWeight: 'bold',
      margin: '0 auto',
      backgroundColor: backgroundColor,
    },
    profileName: {
      marginTop: '10px',
      fontSize: '24px',
      fontWeight: '600',
      color: '#333',
    },
    profileEmail: {
      color: '#777',
      fontSize: '14px',
      marginTop: '5px',
    },
    profileBody: {
      marginTop: '20px',
    },
    profileCategory: {
      fontSize: '16px',
      color: '#555',
      fontWeight: '500',
    },
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.profileCard,
          ...(styles.profileCardHover), // Hover effect
        }}
      >
        <div style={styles.profileHeader}>
          {/* Profile circle with first letter */}
          <div style={styles.profileImage}>
            {firstLetter}
          </div>
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
