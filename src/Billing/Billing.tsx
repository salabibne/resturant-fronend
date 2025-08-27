
// @ts-nocheck
import Category from '../SideSection/Category';
import SelectCategory from '../SideSection/SelectCategory';


const Billing = () => {
  return (
    <>
     {/* <div>
        <Header></Header>
      </div>  */}
      <div className="flex">
        <div className="w-[80%] bg-white  ">
          <Category></Category>
        </div>
     

        <div className=" w-[20#] mt-4">
          <SelectCategory></SelectCategory>
        </div>
      </div>
    </>
  );
};

export default Billing;
