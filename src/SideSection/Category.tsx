// import React from "react";
// import {
//   UserOutlined,
//   SolutionOutlined,
//   BookOutlined,
//   DollarOutlined,
//   LogoutOutlined,
// } from "@ant-design/icons";
// import { Menu, Layout } from "antd";
// import type { MenuProps } from "antd";

// import { useNavigate } from "react-router-dom";
// import FoodItems from "../FoodsItem/FoodItems";

// const { Sider } = Layout;

// const items: MenuProps["items"] = [
//   {
//     key: "1",
//     label: (
//       <span>
//         Bevarage
//       </span>
//     ),
//   },
//   {
//     key: "2",
//     label: (
//       <span>
//         Foods
//       </span>
//     ),
//   },
//   {
//     key: "3",
//     label: (
//       <span>
//         Deserts
//       </span>
//     ),
//   },
  
// ];

// const Category: React.FC = () => {
//   const navigate = useNavigate();
//   const onClick: MenuProps["onClick"] = (e) => {
//     console.log("click ", e);
//     if (e.key === "1") {
//       // navigate("/foodsitems");
//       <FoodItems></FoodItems>
//     }
//     if (e.key === "2") {
//       navigate("/admin/services");
//     }
//     if (e.key === "3") {
//       navigate("/admin/booking");
//     }
//     if (e.key === "4") {
//       navigate("/admin/revenue");
//     }
//   };

//   return (
    
//       <div className="mt-20 min-h-screen bg-white"
//         // width={1}
//       style={{
          
//           // background: "rgba(41, 144, 255, 0.2)",
//           backdropFilter: "blur(15px)", // Glass effect
//           WebkitBackdropFilter: "blur(15px)", // Safari support
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
//           //  width: 256
          
//         }}
//       >
//         <div className="bg-white p-5  text-center">
//           <div className="">
           
//             <h1
             
//               className="text-2xl "
//             >
//               Category
//             </h1>
//           </div>
         
//         </div>
//         <Menu
//           onClick={onClick}
//           style={{
            
//             color: "white", // White text
//             fontWeight: "bold", // Bold font
//              fontSize: "15px",
           
//           }}
//           mode="inline"
//           items={items}
//           theme="light"
//         />
//       </div>
   
//   );
// };

// export default Category;
// @ts-nocheck
import React, { useState } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import FoodItems from "../FoodsItem/FoodItems";
import Header from "../TopSection/Header";

const items: MenuProps["items"] = [
  { key: "spicy chicken", label: "Spicy Chicken" },
  { key: "crispy chicken", label: "Crispy Chicken" },
  { key: "snacks", label: "Snacks" },
  { key: "happy meal", label: "Happy Meal" },
  { key: "noodles and soup", label: "Noodles & Soup" },
  { key: "ice cream", label: "Ice Cream" },
  { key: "coffee", label: "Coffee" },
  { key: "bevarage", label: "Bevarage" },
];

const Category: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const onClick: MenuProps["onClick"] = (e) => {
    setSelectedCategory(e.key); // Update the selected category
  };

  return (
    <>
      <div className="   bg-white  ">
       
        <div className="flex   p-4 gap-4">
          <div className="border-r-2 min-h-screen space-x-3">
            
            <p className="text-center p-4 text-2xl font-bold">Category</p>
            <Menu
              onClick={onClick}
              style={{
                color: "black",
                fontWeight: "bolder",
                fontSize: "15px",
                width: "200px", // Fixed width for menu
              }}
              mode="inline"
              items={items}
              theme="light"
            />
          </div>

          <div className="flex-1">
            {/* <p className="text-9xl">HELLO World</p> */}
            <FoodItems category={selectedCategory} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
