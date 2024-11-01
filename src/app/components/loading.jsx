import React from "react";
import { ColorRing } from "react-loader-spinner";
import { useRecoilState } from "recoil";
import { drawerState } from "../store/drawerState";

export default function Loading() {
  const [open, setOpen] = useRecoilState(drawerState);
  return (
    <div
      className="loading-custom"
    >
      {/* <Bars
        height={80}
        width={open ? 80 : 100}
        color="var(--main-color)"
        ariaLabel="loading"
      /> */}
      <ColorRing
        visible={true}
        height="100"
        width="100"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#F2E1C1", "#FFB4B4", "#E493B3", "#AC87C5", "#756AB6"]}
      />
    </div>
  );
}
