import { LogOut } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Home() {
  // const categoryUrl = "http://localhost:7063/category/get-category-by-id/3";
  // const [allcategories,setAllCategories] = useState();
  // useEffect(() => {
  //   fetch(categoryUrl) 
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch books");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setAllCategories(data);
  //     })
  //     .catch((error) =>
  //       console.error("There was an error fetching the categories!", error)
  //     );
  // }, []);

  const styles = {
    container: {
      display: "flex",
      //flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      background: "linear-gradient(135deg, #1c4e80, #1a73e8)",
      color: "#fff",
      height: "70vh",
      padding: "0px 20px",
    },
    heroSection: {
      marginTop: "20px",
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: "bold",
    },
    subheading: {
      marginTop: "10px",
      fontSize: "1.2rem",
      color: "#dbe5f1",
    },
  }
  return (
    <>

<section>
 <div style={styles.container}>
 <div style={styles.heroSection}>
   <h1 style={styles.heading}>
   StockWise
   </h1>
   <p style={styles.subheading}>
   Welcome to StockWise, where smart investing meets personalization.
   </p>
 </div>
</div>
</section>

    </>
  );
}
