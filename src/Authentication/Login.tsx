import React, { useEffect, useState } from "react";
import { Form, Input, Button, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./AuthLogic/authActions";
import axios from "axios";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [token,setToken]= useState<string|null>(null)
  const logItemsFromLogin = useSelector((state: any) => state.auth);
  console.log("logitemsFrom Login",logItemsFromLogin);
    const dispatch = useDispatch();
    useEffect(() => {
      if(logItemsFromLogin?.loading){
        console.log("loading");
        
      }
      if(logItemsFromLogin?.error){
        console.log("error");
        
      }
      if (logItemsFromLogin?.user) {
        navigate("/"); // Redirect to home if user is logged in
      }
    }, [logItemsFromLogin?.error, logItemsFromLogin?.loading, logItemsFromLogin?.user, navigate]);
    
    // const { loading, error } = useSelector((state: RootState) => state.auth);
    useEffect(()=>{
      if(token){
        const fetchAdminData= async()=>{
          try{
            const result2 = await axios.get(
              `https://resturant-backend-vbiq.onrender.com/api/users/admin/${logItemsFromLogin?.user?.email}`,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );
            console.log("result2Data",result2.data);

          }
          catch(err){
            console.log("result2 error",err);
          }
        }
        fetchAdminData();
      }
    

    },[logItemsFromLogin?.user?.email, token])
  
  const onFinish = async(values: LoginFormValues) => {
    dispatch(login(values.email, values.password) as any);
    try{
      const result = await axios.get(`https://resturant-backend-vbiq.onrender.com/api/users/${values.email}`)
      if(result.data.token){
        setToken(result.data.token)
        localStorage.setItem('authToken', result.data.token)
      }
      console.log("result",result);

 
    }
    catch(error){
      console.log(error);
      }

    console.log("Success:", values);
    
  };

  const onFinishFailed = (errorInfo: unknown) => {

    console.error("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
       {
            logItemsFromLogin?.loading && 
              <Spin
                spinning={logItemsFromLogin?.loading}
                size="large"
                tip="Loading..."
                className="fixed inset-0 flex justify-center items-center bg-gray-100 z-50" />
          }
    
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-sm w-full">
        {
          logItemsFromLogin?.error && (
            <div>
              <p className="text-red-500 text-xl">{logItemsFromLogin?.error}</p>
            </div>
          )}
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <Form
            name="login"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Login
            </Button>
          </Form.Item>
        </Form>
        
        <p className="text-center mt-4">
          Don't have an account?
          <Link to="/registration" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
