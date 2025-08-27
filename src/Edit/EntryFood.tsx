// @ts-nocheck
import React, { useState } from "react";
import { Select, Button } from "antd";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "antd/dist/reset.css";
import axios from "axios";

const AddFoodItemForm = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    // status: "Available",
  });

  const categories = [
    "spicy chicken",
    "crispy chicken",
    "snacks",
    "happy meal",
    "noodles and soup",
    "ice cream",
    "coffee",
    "bevarage",
  ];
  const statuses = ["Available", "Unavailable"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  const handleStatusChange = (value) => {
    setFormData({ ...formData, status: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("New Food Item:", formData);
    try {
      const addProducts = await axios.post(
        "https://resturant-backend-vbiq.onrender.com/api/products",
        formData
      );
      if (addProducts.status === 200) {
        alert("Food item added successfully!");
      }
      console.log(addProducts);
    } catch (error) {
      alert(error);
    }

    // alert("Food item added successfully!");
    setFormData({
      name: "",
      price: "",
      category: "",
      // status: "Available",
    });
  };

  const goToHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg border rounded-lg bg-white">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
        Add Foods
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-600">
            Food Details
          </h2>
          {/* <label className="block mb-2 text-sm font-medium">ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Enter ID"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          /> */}
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name.trim()}
            onChange={handleChange}
            placeholder="Enter food name"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Price (৳)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-600">Category</h2>
          <label className="block mb-2 text-sm font-medium">
            Select Category
          </label>
          <Select
            className="w-full"
            value={formData.category}
            onChange={handleCategoryChange}
            options={categories.map((category) => ({
              label: category,
              value: category,
            }))}
          />
        </div>
        {/* <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-600">Status</h2>
          <label className="block mb-2 text-sm font-medium">
            Select Status
          </label>
          <Select
            className="w-full"
            value={formData.status}
            onChange={handleStatusChange}
            options={statuses.map((status) => ({
              label: status,
              value: status,
            }))}
          />
        </div> */}
        <div className="flex justify-between items-center">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg w-[48%]"
          >
            Add Food Item
          </Button>
          <Button
            type="default"
            onClick={goToHome}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg w-[48%]"
          >
            Go to Home
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddFoodItemForm;
