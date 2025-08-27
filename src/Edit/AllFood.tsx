// @ts-nocheck

import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Spin,
  message,
  Popconfirm,
} from "antd";
import axios from "axios";
import "antd/dist/reset.css";
import { Link } from "react-router-dom";

const FoodTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm(); // Use Form instance

  // Fetch data from server
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://resturant-backend-vbiq.onrender.com/api/products");
        setData(
          response.data.data.map((item: any) => ({ ...item, key: item._id }))
        );
      } catch (error: any) {
        message.error("Failed to fetch food data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Show update modal
  const showUpdateModal = (record: any) => {
    setEditingItem(record);
    form.setFieldsValue({ price: record.price }); // Only populate the price field
    setIsModalVisible(true);
  };

  // Handle update submission
  const handleUpdate = async (values: any) => {
    if (!editingItem) return;

    try {
      const response = await axios.put(
        `https://resturant-backend-vbiq.onrender.com/api/products/${editingItem?._id}`,
        { price: values.price } // Only update the price
      );
      console.log(response);

      setData((prevData: any[]) =>
        prevData.map((item) =>
          item._id === editingItem?._id
            ? { ...item, price: values.price } // Update price in state
            : item
        )
      );
      message.success("Food updated successfully");
    } catch (error) {
      console.error(error);
      message.error("Food update failed");
    } finally {
      setIsModalVisible(false);
    }
  };

  // Handle delete action
  const handleDelete = async (id: any) => {
    try {
      await axios.delete(`https://resturant-backend-vbiq.onrender.com/api/products/${id}`);
      setData((prevData) => prevData.filter((item) => item._id !== id));
      message.success("Food deleted successfully");
    } catch (error) {
      message.error("Food deletion failed");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: any) => `৳${price}`,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: { _id: any }) => (
        <div className="space-x-2">
          <Button
            type="primary"
            className="bg-white text-black border-2 border-black"
            onClick={() => showUpdateModal(record)}
          >
            Update
          </Button>
          <Popconfirm
            title="Are you sure to delete this food item?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="bg-white text-slate-950 border-2 border-black hover:bg-red-500 text-slate-500">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between gap-4 mb-4 p-4">
        <h1 className="text-2xl font-bold ">All Food List</h1>
        <Link to="/">
          <h1 className="text-xl font-bold underline">Go Home</h1>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <Spin />
        </div>
      ) : (
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 5 }}
          className="bg-white shadow-md rounded"
        />
      )}

      <Modal
        title="Update Food Price"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleUpdate}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item label="Name">
            <Input value={editingItem?.name as string} disabled />
          </Form.Item>
          <Form.Item label="Category">
            <Input value={editingItem?.category as string} disabled />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <div className="flex justify-end space-x-2">
            <Button
              onClick={() => setIsModalVisible(false)}
              className="bg-gray-300 hover:bg-gray-400 text-black"
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Update
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FoodTable;
