import React from "react";
import "./less/jjccmodal.less";

export default function popUpModal(props:{children:React.ReactNode}) {
  return <div className="jjcc-popup-modal">
      {props.children}
  </div>;
}
