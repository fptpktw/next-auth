"use client";
import React, { useState, useEffect } from "react";
import { Bars, Hourglass } from "react-loader-spinner";
import Loading from "../../components/loading";
import Progress from "@/app/components/progress";
import { ThaiDatePicker } from "thaidatepicker-react";
import moment from "moment";

export default function Mission() {
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // หยุด loading หลังจาก 3 วินาที
    }, 3000);
  };

  const handleDatePickerChange = (christDate, buddhistDate) => {
    setSelectedDate(christDate);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1>About Mission Page</h1>
          <hr className="mb-3" />
          <div className="grid grid-cols-12 gap-2 mb-3">
            <div className="col-span-4">
              Name
              <input
                onChange={(e) => setUsername(e.target.value)}
                className="main-input"
                type="text"
                placeholder="Enter your username"
              />
            </div>
            <div className="col-span-4">
              Birthday
              <ThaiDatePicker
                clearable={false}
                inputProps={{
                  displayFormat: "DD/MM/YYYY",
                  readOnly: true,
                  className: `disabled:bg-gray-200`,
                }}
                value={selectedDate}
                onChange={handleDatePickerChange}
              />
            </div>
            <div className="col-span-4 text-left">
              ID Card
              <input
                onChange={(e) => setUsername(e.target.value)}
                className="main-input"
                type="text"
                placeholder="Enter your username"
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2 mb-3">
            <div className="col-span-4">
              Age
              <input
                onChange={(e) => setUsername(e.target.value)}
                className="main-input"
                type="text"
                placeholder="Enter your username"
              />
            </div>
            <div className="col-span-4">
              Phone
              <input
                onChange={(e) => setUsername(e.target.value)}
                className="main-input"
                type="text"
                placeholder="Enter your username"
              />
            </div>
          </div>
          <button
            type="button"
            className="main-button mt-4"
            onClick={handleClick}
            disabled={processing}
          >
            {processing ? <Progress /> : "Save"}
          </button>
          <br />
        </div>
      )}
    </div>
  );
}
