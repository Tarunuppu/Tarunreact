import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { format } from "date-fns";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";

function Timeparttask(props) {
  const [records, setrecords] = useState(null);
  const token = localStorage.access_token;
  useEffect(() => {
    let config = {
      headers: { Authorization: "Bearer " + token },
      params: {
        attribute: "duedate",
        order: "descending",
        temp: "true",
      },
    };
    axios
      .get(props.url, config)
      .then((response) => {
        setrecords(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);
  return (
    <>
      {records && (
        <Timeline lineColor={"#ddd"}>
          {records.map((data) => (
            <TimelineItem
              key={data.id}
              dateText={format(new Date(data.duedate), "LLL dd, yyyy hh:mm aa")}
              style={{ color: "#576F72" }}
            >
              <h3>Title :{data.title}</h3>
              <p>Description :{data.description}</p>
              <p>Assignee :{data.assignee}</p>
              <p>Created By : {data.createdby}</p>
              <p>Status : {data.status}</p>
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </>
  );
}
export default Timeparttask;
