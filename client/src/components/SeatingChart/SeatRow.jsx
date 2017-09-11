import React from "react";

const SeatRow = (props) => {
  return(
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
      className="tile is-parent"
    >
      {props.children}
    </div>
  )
}

export default SeatRow;