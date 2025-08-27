// import { List, Divider, Button } from "antd";
// import { useDispatch, useSelector } from "react-redux";

// const SelectCategory = () => {
//   // Fetch items from Redux store
//   const cartItems = useSelector((state) => state);
//  const dispatch = useDispatch();
//   // Calculate total price dynamically
//   const totalPrice = cartItems
//     .reduce((sum, item) => sum + parseFloat(item.totalPrice || 0), 0)
//     .toFixed(2);
  
//   const deleteItem = (id)=>{
//     dispatch({type:"REMOVE",payload:id})
//   }


// const handlePrint = () => {
//   // Create the POS-friendly content
//   const receiptContent = `
//     <style>
//       body {
//         font-family: monospace; /* Use a monospace font for POS printers */
//         font-size: 12px;
//         margin: 0;
//         padding: 10px;
//         width: 58mm; /* Adjust for receipt width */
//       }
//       .center {
//         text-align: center;
//       }
//       .bold {
//         font-weight: bold;
//       }
//       .line {
//         border-top: 1px dashed #000;
//         margin: 8px 0;
//       }
//       .item {
//         display: flex;
//         justify-content: space-between;
        
//       }
//       .footer {
//         margin-top: 10px;
//       }
//     </style>
//     <div>
//       <div class="center bold">PALOLIK</div>
//       <div class="center">North South University</div>
   
//       <div class="center">Contact: 123-456-7890</div>
//       <div class="line"></div>
//       <div class="center bold">Order Details</div>
//       <div class="line"></div>
//       ${cartItems
//         .map(
//           (item) => `
//           <div class="item">
//             <span>${item.name}  X ${item.quantity} </span>
//             <span>${item.totalPrice}</span>
//           </div>
//         `
//         )
//         .join("")}
//       <div class="line"></div>
//       <div class="item bold">
//         <span>Total:</span>
//         <span>${totalPrice}</span>
//       </div>
//       <div class="line"></div>
//       <div class="center footer">Thank you for shopping!</div>
//        <div class="line"></div>
//        <div class="center footer">Developed By GROWTH.IO</div>
//     </div>
//   `;

//   // Open a new window for printing
//   const newWindow = window.open("", "", "width=600,height=600");
//   newWindow.document.write(`<html><body>${receiptContent}</body></html>`);
//   newWindow.document.close();

//   // Trigger the print dialog
//   newWindow.print();
// };


  


//   return (
//     <div className="flex items-center justify-center ml-32 mr-12">
//       <div className="bg-white shadow-lg p-4 rounded ">
//         <h3 className="text-lg font-semibold mb-4">Selected Items</h3>
//         {cartItems.length > 0 ? (
//           <>
//             <List
//               dataSource={cartItems}
//               renderItem={(item) => (
//                 <List.Item>
//                   <div className="flex justify-between w-fit gap-4">
//                     <span>{item.name} </span>
//                     <span>X </span>
//                     <span>{item.quantity}</span>
//                     <span><Button onClick={()=>deleteItem(item.id)} className="bg-red-500 text-white">DEL</Button></span>
//                   </div>
//                 </List.Item>
//               )}
//             />
//             <Divider />
//             <div className="flex justify-between font-semibold text-lg">
//               <span>Total:</span>
//               <span>${totalPrice}</span>
//             </div>
//           </>
//         ) : (
//           <p className="text-gray-500">No items selected yet.</p>
//         )}
//         <Divider />
//         {/* <Button
         
//           disabled={cartItems.length === 0}
//           className="w-full bg-green-600 text-white font-bold"
//         >
//           Proceed to Checkout
//         </Button> */}
//         <Button
         
//           disabled={cartItems.length === 0}
//           className="w-full bg-green-600 text-white font-bold"
//           onClick={handlePrint}
//         >
//          printout
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default SelectCategory;
// @ts-nocheck

import { List, Divider, Button, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

const SelectCategory = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.products);
  console.log("cartItems",cartItems);

  const [customerPayment, setCustomerPayment] = useState(0);
  const [totalPriceAll, setTotalPriceAll] = useState(0);
  const [returnAmount, setReturnAmount] = useState(0);


  // Send the order items to the server

  const SendOrder = async() => {
    const itemsAll = cartItems.map((item) => {
      let id = item._id; let quantity = item.quantity, unit_price = item.price 
      return [ id, quantity, unit_price ];
    });

    const order = { amount: Number(totalPriceAll), items: itemsAll }
    console.log("send order", order);
    
      try {
        const response = await axios.post(
          "https://resturant-backend-vbiq.onrender.com/api/orders",
          order
        );
        message.success("order sent to the database")
        console.log("Order successfully sent:", response.data);
      } catch (error) {
        message.error("something went wrong");
        console.error("Error sending order:", error);
      }
    
  }

  // Update total price whenever cartItems change
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + parseFloat(item.totalPrice || 0),
      0
    );
    setTotalPriceAll(total.toFixed(2));
    setReturnAmount((customerPayment - total).toFixed(2));
  }, [cartItems, customerPayment]);

  const deleteItem = (id) => {
    console.log("Delete Item",id);
    dispatch({ type: "REMOVE", payload: id });
  };

  const handlePaymentChange = (e) => {
    const payment = parseFloat(e.target.value) || 0;
    setCustomerPayment(payment);
  };

  const handlePrint = () => {
    const currentDateTime = new Date();
    const formattedDate = currentDateTime.toLocaleDateString();
    const formattedTime = currentDateTime.toLocaleTimeString();

    const receiptContent = `
      <style>
        body {
          font-family: monospace;
          font-size: 12px;
          margin: 0;
          padding: 10px;
          width: 80mm;
        }
        .center {
          text-align: center;
        }
        .bold {
          font-weight: bold;
        }
        .line {
          border-top: 1px dashed #000;
          margin: 8px 0;
        }
        .item {
          display: flex;
          justify-content: space-between;
        }
        .footer {
          margin-top: 10px;
        }
      </style>
      <div>
        <div class="center bold">Kazi Farms Kitchen</div>
        <div class="center bold">PALOLIK</div>
        <div class="center">North South University</div>
        <div class="center">Contact: 01806415203</div>
        <div class="line"></div>
        <div class="center">
          <span>Date: ${formattedDate}</span>
          <span>Time: ${formattedTime}</span>
        </div>
        <div class="line"></div>
        <div class="center bold">Order Details</div>
        <div class="line"></div>
        ${cartItems
          .map(
            (item) => `
            <div class="item">
              <span>${item.name} X ${item.quantity}</span>
              <span>${item.totalPrice}</span>
            </div>
          `
          )
          .join("")}
        <div class="line"></div>
        <div class="item bold">
          <span>Total:</span>
          <span>${totalPriceAll}</span>
        </div>
        <div class="item">
          <span>Paid:</span>
          <span>${customerPayment}</span>
        </div>
        <div class="item bold">
          <span>Return:</span>
          <span>${returnAmount}</span>
        </div>
        <div class="line"></div>
        <div class="center footer">Thank you for shopping!</div>
        <div class="line"></div>
        <div class="center footer">Developed By GROWTH.IO</div>
      </div>
    `;

    const newWindow = window.open("", "", "width=600,height=600");
    newWindow.document.write(`<html><body>${receiptContent}</body></html>`);
    newWindow.document.close();
    newWindow.print();

    SendOrder()
  };

  return (
    <div className="flex items-center justify-center ml-32 mr-12">
      <div className="bg-white shadow-lg p-4 rounded">
        <h3 className="text-lg font-semibold mb-4">Selected Items</h3>
        {cartItems.length > 0 ? (
          <>
            <Input
              type="number"
              placeholder="Enter customer payment"
              onChange={handlePaymentChange}
              value={customerPayment}
              className="w-full mb-6"
            />
            <List
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item>
                  <div className="flex justify-between w-fit gap-4">
                    <span>{item.name}</span>
                    <span>X</span>
                    <span>{item.quantity}</span>
                    <span>
                      <Button
                        onClick={() => deleteItem(item._id)}
                        className="bg-red-500 text-white"
                      >
                        DEL
                      </Button>
                    </span>
                  </div>
                </List.Item>
              )}
            />
            <Divider />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>{totalPriceAll}</span>
            </div>
            <div className="flex justify-between  text-lg mt-2">
              <span>Return:</span>
              <span>{returnAmount >= 0 ? returnAmount : "0.00"}</span>
            </div>
          </>
        ) : (
          <p className="text-gray-500">No items selected yet.</p>
        )}
        <Divider />
        <Button
          disabled={cartItems.length === 0||customerPayment===0 ||customerPayment<totalPriceAll}
          className="w-full bg-green-600 text-white font-bold"
          onClick={handlePrint}
        >
          Print Receipt
        </Button>
      </div>
    </div>
  );
};

export default SelectCategory;


