

// // export default FoodItems;
// import React, { useEffect, useState } from "react";
// import { Card, Button, Modal, InputNumber, message } from "antd";
// import Header from "../TopSection/Header";
// import { useDispatch } from "react-redux";
// import axios from "axios";

// // const foodItems = [
// //   {
// //     id: "1",
// //     name: "Cola",
// //     price: 2.5,
// //     category: "bevarage",
// //     status: "Available",
// //   },
// //   {
// //     id: "2",
// //     name: "Coffee",
// //     price: 3.0,
// //     category: "bevarage",
// //     status: "Available",
// //   },
// //   {
// //     id: "7",
// //     name: "Coffee pro",
// //     price: 3.0,
// //     category: "bevarage",
// //     status: "Available",
// //   },
// //   {
// //     id: "3",
// //     name: "Cheeseburger",
// //     price: 8.99,
// //     category: "Foods",
// //     status: "Available",
// //   },
// //   {
// //     id: "4",
// //     name: "Grilled Chicken Salad",
// //     price: 10.99,
// //     category: "Foods",
// //     status: "Available",
// //   },
// //   {
// //     id: "5",
// //     name: "Ice Cream",
// //     price: 4.99,
// //     category: "Deserts",
// //     status: "Available",
// //   },
// //   {
// //     id: "6",
// //     name: "Cake",
// //     price: 7.5,
// //     category: "Deserts",
// //     status: "Out of Stock",
// //   },
// // ];

// const FoodItems = ({ category }: { category: string }) => {
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   const dispatch = useDispatch();
 
    
// const [foodItems, setFoodItems] = useState([]);

// useEffect(() => {
//   const fetchSpecificFoods = async () => {
//     try {
//       const response = await axios.get("https://resturant-backend-vbiq.onrender.com/api/products");
//       setFoodItems(response.data.data);
//       console.log(response.data.data);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     }
//   };

//   fetchSpecificFoods();
// }, []);
  
//   useEffect(() => {
//     // Filter items based on the selected category
//     setFilteredItems(foodItems.filter((item) => item.category === category));
//   }, [category,foodItems]);

//   const handleAddToCart = (item: any) => {
//     if (item.status === "Out of Stock") {
//       message.error("This item is out of stock.");
//       return;
//     }
//     setSelectedItem(item);
//     setIsModalOpen(true);

//   };
  
//     const storeFood = async (item) => {
//       dispatch({ type: "ADD", payload: item });
//     };

//   const handleFinish = () => {
//     if (!quantity || quantity < 1) {
//       message.error("Please enter a valid quantity.");
//       return;
//     }

//     const itemDetails = {
//       ...selectedItem,
//       quantity,
//       totalPrice: (selectedItem.price * quantity).toFixed(2),
//     };

//     console.log("Item added to cart:", itemDetails);
//     message.success("Item added to cart successfully!");
//     setIsModalOpen(false);
//     setSelectedItem(null);
//     setQuantity(1);
//     storeFood(itemDetails);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setSelectedItem(null);
//     setQuantity(1);
//   };

//   return (
//     <>
//       <Header></Header>
//       <div className="grid grid-cols-3 gap-4 p-4 mt-4">
//         {filteredItems.map((item) => (
//           <Card
//             key={item._id}
//             title={item.name}
//             // extra={
//             //   <span
//             //     className={`text-sm ${
//             //       item.status === "Available"
//             //         ? "text-green-500"
//             //         : "text-red-500"
//             //     }`}
//             //   >
//             //     {item.status}
//             //   </span>
//             // }
//             className="shadow-lg bg-slate-200 "
//           >
//             <p>Price: ${item.price}</p>
//             <Button
//               onClick={() => handleAddToCart(item)}
//               // disabled={item.status === "Out of Stock"}
//             >
//               Add to Cart
//             </Button>
//           </Card>
//         ))}
//       </div>
//       <Modal
//         title={`Add ${selectedItem?.name} to Cart`}
//         open={isModalOpen}
//         onOk={handleFinish}
//         onCancel={handleCancel}
//         okText="Finish"
//         cancelText="Cancel"
//       >
//         <p>Price per item: ${selectedItem?.price}</p>
//         <InputNumber
//           min={1}
//           value={quantity}
//           onChange={(value) => setQuantity(value)}
//           className="w-full"
//         />
//       </Modal>
//     </>
//   );
// };

// export default FoodItems;


// @ts-nocheck

import React, { useEffect, useState } from "react";
import { Card, Button, Modal, InputNumber, message, Input, Empty } from "antd";
import Header from "../TopSection/Header";
import { useDispatch } from "react-redux";
import axios from "axios";

const FoodItems = ({ category }: { category: string }) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchSpecificFoods = async () => {
      try {
        const response = await axios.get("https://resturant-backend-vbiq.onrender.com/api/products");
        setFoodItems(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchSpecificFoods();
  }, []);

  useEffect(() => {

  

    // Filter items based on the selected category and search term
   if (category) {
      const filtered = foodItems.filter(
        (item) =>
          item.category === category &&
          (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(item.price).includes(searchTerm))
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]); // Clear items if no category is selected
    }
  }, [category, foodItems, searchTerm]);

  const handleAddToCart = (item: any) => {
    if (item.status === "Out of Stock") {
      message.error("This item is out of stock.");
      return;
    }
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const storeFood = async (item: any) => {
    dispatch({ type: "ADD", payload: item });
  };

  const handleFinish = () => {
    if (!quantity || quantity < 1) {
      message.error("Please enter a valid quantity.");
      return;
    }

    const itemDetails = {
      ...selectedItem,
      quantity,
      totalPrice: (selectedItem.price * quantity).toFixed(2),
    };

    console.log("Item added to cart:", itemDetails);
    message.success("Item added to cart successfully!");
    setIsModalOpen(false);
    setSelectedItem(null);
    setQuantity(1);
    storeFood(itemDetails);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setQuantity(1);
  };

  return (
    <>
      <Header />
      <div className="p-4">
        <Input
          placeholder="Search Food"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-full"
        />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Card
                key={item.id}
                title={item.name}
                className="shadow-lg bg-slate-200"
              >
                <p>Price: ৳{item.price}</p>
                <Button onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </Button>
              </Card>
            ))
          ) : (
            <Empty description="No items found" className="col-span-3" />
          )}
        </div>
      </div>
      <Modal
        title={`Add ${selectedItem?.name} to Cart`}
        open={isModalOpen}
        onOk={handleFinish}
        onCancel={handleCancel}
        okText="Finish"
        cancelText="Cancel"
      >
        <p>Price per item: ${selectedItem?.price}</p>
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => setQuantity(value)}
          className="w-full"
        />
      </Modal>
    </>
  );
};

export default FoodItems;


