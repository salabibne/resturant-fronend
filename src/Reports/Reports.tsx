// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, DatePicker, Spin, Alert } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/reset.css";
import dayjs from "dayjs";

const Reports = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Fetch report data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://resturant-backend-vbiq.onrender.com/api/report/order"
        );
        setReportData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch report data. Please try again.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleGenerateExcel = () => {
    // let apiUrl = "https://resturant-backend-vbiq.onrender.com/api/report/excel/admin/dellvai@outlook.com";
    let apiUrl = "https://resturant-backend-vbiq.onrender.com/api/report/excel";
    if (startDate && endDate) {
      const start = dayjs(startDate).format("YYYY-MM-DD");

      const end = dayjs(endDate).format("YYYY-MM-DD");
      console.log("start",start);
      console.log("end",end);
      apiUrl += `?start=${start}&end=${end}`;
    }
    // Redirect to API URL
    console.log("Api Url",apiUrl);
    window.location.href = apiUrl;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert message={error} type="error" showIcon />
      </div>
    );
  }

  const { totalAmount, totalOrder } = reportData?.data?.report || {};

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 min-h-screen relative">
      {/* Home Button */}
      <div className="absolute top-4 right-4">
        <Link to="/">
          <Button type="primary">Home</Button>
        </Link>
      </div>

      {/* Report Card */}
      <Card
        title="Order Report"
        bordered={true}
        className="w-full max-w-md shadow-md"
      >
        <p className="text-lg font-medium">
          Total Amount:{" "}
          <span className="font-semibold">${totalAmount || 0}</span>
        </p>
        <p className="text-lg font-medium">
          Total Orders: <span className="font-semibold">{totalOrder || 0}</span>
        </p>
      </Card>

      {/* Date Picker and Generate Excel Button */}
      <div className="mt-6 w-full max-w-md">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <DatePicker
            placeholder="Start Date"
            className="w-full"
            onChange={(date) => setStartDate(date)}
          />
          <DatePicker
            placeholder="End Date"
            className="w-full"
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <Button type="primary" className="w-full" onClick={handleGenerateExcel}>
          Generate Excel File
        </Button>
      </div>
    </div>
  );
};

export default Reports;
