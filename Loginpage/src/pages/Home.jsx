import { LogOut } from "lucide-react";
import Lottie from "lottie-react"; // Correct default import
import animationData from "../images/Animation - 1731827119973.json"; // Import your Lottie JSON file

export default function Home() {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between", // Keeps items equally spaced
      textAlign: "center",
      background: "rgb(15,38,78)",
      background:
        " linear-gradient(356deg, rgba(0,0,0,1) 8%, rgba(3,20,48,1) 53%, rgba(0,0,0,1) 100%, rgba(8,29,66,1) 100%)",
      color: "#fff",
      height: "70vh",
      padding: "0px", // Adjust padding to remove any unwanted space
      margin: "0", // Ensure no margin is added to prevent spacing
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
  );
}
