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

  return (
    <>

<section
  className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat -mt-12"
  style={{
    background: "radial-gradient(789px at 100.2% 3%, rgb(255, 255, 255) 31.1%, rgb(205, 181, 93) 36.4%, rgb(244, 102, 90) 50.9%, rgb(199, 206, 187) 60.7%, rgb(249, 140, 69) 72.5%, rgb(255, 255, 255) 72.6%)",
  }}
>
  <div className="container mx-auto flex flex-col items-center justify-center text-center py-9">
    <h2 className="text-4xl font-extrabold text-gray-800 sm:text-6xl">StockWise</h2>
    <p className="bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-2xl font-medium text-transparent sm:text-3xl mt-4">
      Welcome to StockWise, where smart investing meets personalization.
    </p>
  </div>
</section>

    </>
  );
}
