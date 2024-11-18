//Animation - 1731827119973.json

import { LogOut } from "lucide-react";
import Lottie from "lottie-react"; // Correct default import
import animationData from "../images/Animation - 1731827119973.json"; // Import your Lottie JSON file

export default function Home() {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between", // Adjust alignment to space items
      textAlign: "center",
      background: "linear-gradient(135deg, #1c4e80, #1a73e8)",
      color: "#fff",
      height: "70vh",
      padding: "0px 20px",
    },
    heroSection: {
      //marginTop: "20px",
      flex: 1, // Allow space for the Lottie animation
    },
    heading: {
     // marginBottom:"100px",
      fontSize: "4.5rem",
      fontWeight: "bold",
    },
    subheading: {
      marginTop: "5px",
     marginBottom:"150px",
      fontSize: "1.2rem",
      color: "#dbe5f1",
    },
    animationContainer: {
      flex: 1, // Allow space for the Lottie animation
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    animation: {
      width: "100%", // Adjust size of the Lottie animation
      maxWidth: "400px", // Limit max width
    },
  };

  return (
    <>
      <section>
        <div style={styles.container}>
          <div style={styles.heroSection}>
            <h1 style={styles.heading}>StockWise</h1>
            <p style={styles.subheading}>
              Welcome to StockWise, where smart investing meets personalization.
            </p>
          </div>
          <div style={styles.animationContainer}>
            <Lottie animationData={animationData} style={styles.animation} />
          </div>
        </div>
      </section>
    </>
  );
}


