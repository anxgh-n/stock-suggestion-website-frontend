import { LogOut } from "lucide-react";
import NavigationComponent from "../components/NavigationComponent";
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react"; // Correct default import
import animationData from "../images/loading.json"; // Import your Lottie JSON file
import grc1 from "../Images/greece.jpg";
import Footer from "../components/Footer";

export default function Home() {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between", // Keeps items equally spaced
      textAlign: "center",
      height: "100",
      padding: "0px", // Adjust padding to remove any unwanted space
      margin: "0", // Ensure no margin is added to prevent spacing
      backgroundImage: `url(${grc1}) `,
      backgroundSize: "cover", // Ensures both gradient and image cover the header
      backgroundRepeat: "no-repeat", // Prevents repetition for both layers
      backgroundPosition: "center",
      backgroundAttachment: "fixed", // Centers both the image and gradient
    },
    heroSection: {
      flex: 1, // Take up equal space
      display: "flex",
      flexDirection: "column", // Stack text vertically
      alignItems: "center", // Align items in the center
      justifyContent: "center", // Align text in the center
    },
    heading: {
      fontSize: "4.5rem",
      fontWeight: "bold",
    },
    subheading: {
      marginTop: "5px",
      marginBottom: "50px", // Reduced margin to remove gap
      fontSize: "1.2rem",
      color: "#dbe5f1",
    },
    animationContainer: {
      flex: 1, // Take up equal space
      display: "flex",
      justifyContent: "center", // Center the animation
      alignItems: "center", // Center the animation vertically
    },
    animation: {
      width: "100%", // Adjust size of the Lottie animation
      maxWidth: "400px", // Limit max width
    },
  };

  return (
    <section>
      
      <div style={styles.container}>
        <div style={styles.heroSection}></div>
        <div style={styles.animationContainer}>
          <Lottie animationData={animationData} style={styles.animation} />
        </div>
      </div>
      
    </section>
    
  );
}
