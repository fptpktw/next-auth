"use client";
import React, { useState, useEffect } from "react";
import { Bars, Hourglass } from "react-loader-spinner";
import Loading from "../../components/loading";
import Progress from "@/app/components/progress";
import { ThaiDatePicker } from "thaidatepicker-react";

export default function Team() {
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2024-02-29");

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
    console.log(christDate);
    console.log(buddhistDate);
    //const formattedDate = moment(christDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
    setSelectedDate(christDate);
    setSelectedThaiDate(buddhistDate);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1>About Team Page</h1>
          <ThaiDatePicker
            clearable={false}
            inputProps={{ displayFormat: "DD/MM/YYYY", readOnly: true }}
            value={selectedDate}
            onChange={handleDatePickerChange}
          />
          <p>Selected date: {selectedDate}</p>
          <p>
            This is the about page of the application. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim
            praesent elementum facilisis leo vel. Risus at ultrices mi tempus
            imperdiet. Semper risus in hendrerit gravida rutrum quisque non
            tellus.
          </p>
          <br />
          <p>
            This is the about page of the application. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim
            praesent elementum facilisis leo vel. Risus at ultrices mi tempus
            imperdiet. Semper risus in hendrerit gravida rutrum quisque non
            tellus.
          </p>
          <br />
          <p>
            This is the about page of the application. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim
            praesent elementum facilisis leo vel. Risus at ultrices mi tempus
            imperdiet. Semper risus in hendrerit gravida rutrum quisque non
            tellus.
          </p>
          <br />
          <p>
            This is the about page of the application. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim
            praesent elementum facilisis leo vel. Risus at ultrices mi tempus
            imperdiet. Semper risus in hendrerit gravida rutrum quisque non
            tellus.
          </p>
          <br />
          <p>
            This is the about page of the application. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim
            praesent elementum facilisis leo vel. Risus at ultrices mi tempus
            imperdiet. Semper risus in hendrerit gravida rutrum quisque non
            tellus.
          </p>
          <br />
          <p>
            This is the about page of the application. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim
            praesent elementum facilisis leo vel. Risus at ultrices mi tempus
            imperdiet. Semper risus in hendrerit gravida rutrum quisque non
            tellus.
          </p>
          <button
            type="button"
            className="main-button"
            onClick={handleClick}
            disabled={processing}
          >
            {processing ? <Progress /> : "Click Me"}
          </button>
          <br />
        </div>
      )}
    </div>
  );
}
