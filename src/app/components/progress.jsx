import React from "react";
import { Hourglass, ThreeDots } from "react-loader-spinner";

export default function Progress() {
  return (
    <div className="flex justify-center items-center">
      {/* <Hourglass
            height="25"
            width="15"
            colors={["#fff", "#fff"]}
        /> */}
      <ThreeDots
        visible={true}
        height="25"
        width="25"
        color="#fff"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
