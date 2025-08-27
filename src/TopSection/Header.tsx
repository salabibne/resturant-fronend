// @ts-nocheck
import { Link } from "react-router-dom";
import logo from "../../public/logo/kazifarmslogo.jpg";
import FoodItems from "../FoodsItem/FoodItems";
import SearchFood from "./SearchFood";
import Toogle from "../layouts/Toogle";

const Header = () => {
  return (
    <>
      <header className="grid grid-cols-3 items-center justify-center    ">
        {/* Logo and name */}
        <div className="flex flex-col  items-center justify-center gap-x-4">
          <img src={logo} alt="Kazi Farms Logo" className="w-40" />
          <p className="text-lg font-bold  text-amber-500">PALOLIK</p>
        </div>

        {/* login , registration and admin panel layout  */}
        <div className="flex justify-end ml-96 ">
         <Toogle></Toogle>
        </div>


        {/* reports */}
        {/* <div className="flex justify-center">
          <Link to="/getReports">
            <button className="px-2 py-1 bg-black text-white rounded-md shadow ">
              Reports
            </button>
          </Link>
        </div> */}

       
        {/* <div className="flex items-center justify-center gap-2">
         
          <Link to="/entryFood">
            <button className="px-2 py-1 bg-black text-white rounded-md shadow ">
              Add Food
            </button>
          </Link>
          <Link to="/allFood">
            <button className="px-2 py-1 bg-black text-white rounded-md shadow ">
              All Food
            </button>
          </Link>
        
        </div> */}
      
      </header>
    </>
  );
};

export default Header;
