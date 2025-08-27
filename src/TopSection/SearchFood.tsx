// @ts-nocheck
import React, { useState } from "react";
import axios from "axios";
import { Input } from "antd";

const SearchFood: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 3) {
      axios
        .get(`https://resturant-backend-vbiq.onrender.com/api/query/${value}`)
        .then((response) => {
          console.log("Search results:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching food data:", error);
        });
    }
  };

  return (
    <Input
      placeholder="Search Food"
      value={searchTerm}
      onChange={handleInputChange}
    />
  );
};

export default SearchFood;
