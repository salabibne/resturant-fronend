import React from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

import {  register } from "./AuthLogic/authActions";
import { useDispatch } from "react-redux";
import axios from "axios";
// TODO make a post request api/users 
const Registration: React.FC = () => {
    const dispatch = useDispatch();
//   const { loading, error } = useSelector((state: RootState) => state.auth);
    interface RegistrationFormValues {
        email: string;
        password: string;
        name:string;
        phone:number;

      }
  const onFinish = async (values: RegistrationFormValues) => {
    try{
      const payload = {
        ...values,
        role:"user"
      }
      const response = await axios.post(
        "https://resturant-backend-vbiq.onrender.com/api/users",payload
      )
      console.log("user saved",response.data);

       await dispatch(register(values.email, values.password));
       console.log("Success:", values);
    }
    catch(error){
      console.error(
        "Error registering user:",
        error.response?.data || error.message
      );
      
    }
   
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
              { pattern: /^[0-9]+$/, message: "Phone number must be numeric!" },
            ]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Register
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center mt-4">
          Already have an account? 
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
