// @ts-nocheck
import React from "react";
import Billing from "../Billing/Billing";
import FoodItems from "../FoodsItem/FoodItems";

const Wraper = () => {
  return (
    <div className="grid grid-rows-2 gap-4">
      {/* Billing Section */}
      <div className="">
        <Billing />
      </div>

      {/* Food Items Section */}
      <div className="">
        <FoodItems />
      </div>
    </div>
  );
};

export default Wraper;
