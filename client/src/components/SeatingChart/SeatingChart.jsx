import React from "react";
import Seat from "./Seat";
import SeatRow from "./SeatRow";
import { formatName } from "../../utils/nameUtil";

const SeatingChart = (props) => {
  return(
    <div className="tile is-ancestor">
      <div className="tile is-vertical">
        {Object.entries(props.seats).map(row=>{
          return(
            <SeatRow key={row[0]}>
              {Object.entries(row[1]).map(seat=>{
                let student = props.students[seat[1]]
                if (student) {
                  return(
                    <Seat
                      key={`${row[0]}${seat[0]}`}
                      coords={`${row[0]}, ${seat[0]}`}
                      studentName={formatName(student.name)}
                      width={props.seatWidth}
                    />
                  )
                } else {
                  return(
                    <Seat
                      key={`${row[0]}${seat[0]}`}
                      coords={`${row[0]}, ${seat[0]}`}
                      width={props.seatWidth}
                    />
                  )
                }
              })}
            </SeatRow>
          )
        })}
      </div>
    </div>
  )
}

export default SeatingChart;