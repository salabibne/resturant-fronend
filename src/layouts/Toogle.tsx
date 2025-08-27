import { Button, Dropdown, Menu } from "antd";
import { UserOutlined, LogoutOutlined, LoginOutlined, DashboardOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Authentication/AuthLogic/authActions";
import { useNavigate } from "react-router-dom";

const Toogle = () => {
  const logItems = useSelector((state: any) => state.auth);
  console.log("logitems ", logItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirect on login
  useEffect(() => {
    if (logItems?.user) {
      navigate("/"); // Redirect to home if user is logged in
    }
  }, [logItems?.user, navigate]);

  const onLogin = async() => {
   
    if (!logItems?.user) {
      navigate("/login"); // Redirect to login page
    }

    // if ( await logItems?.user) {
    //   navigate("/"); // Redirect to home if user is logged in
    // }
  };

  const onLogout = () => {
    dispatch(logout() as any); // Dispatch logout action
    console.log("User logged out");
    localStorage.removeItem("authToken");
  };

  const onSwitchToAdmin = () => {
    navigate("/adminDashboard")
    console.log("Switch To Admin Panel");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="admin" icon={<DashboardOutlined />} onClick={onSwitchToAdmin}>
        Switch to Admin Panel
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex justify-between items-center px-6 py-4 text-white shadow-md">
      <div>
        {logItems?.user ? (
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <Button icon={<UserOutlined />} className="flex items-center">
              User Options
            </Button>
          </Dropdown>
        ) : (
          <Button
            type="primary"
            icon={<LoginOutlined />}
            className="bg-blue-500 hover:bg-blue-600"
            onClick={onLogin}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Toogle;
