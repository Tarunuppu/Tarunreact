import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import { setassignee, setstatus } from "./userslice";
import { setcreatedby } from "./userslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function ToMePie() {
  const [options, setoptions] = useState();
  const token = localStorage.access_token;
  const useremail = useSelector((state) => state.userdetails.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleclick(e) {
    //console.log(e.point.attribute);
    dispatch(setassignee(useremail));
    dispatch(setstatus(e.point.name.toLowerCase()));
    dispatch(setcreatedby(""));
    navigate("/welcome/filteredtasks", {
      state: { url: "http://localhost:8000/task/gettasks-multiplefilters" },
    });
  }
  useEffect(() => {
    var seriesvalue = "hi";
    let config = {
      headers: { Authorization: "Bearer " + token },
    };
    const fetchData = async () => {
      await axios
        .get("http://localhost:8000/task/getassignedtome", config)
        .then((response) => {
          //console.log(response.data);
          seriesvalue = response.data;
          setoptions({
            chart: {
              type: "pie",
            },
            title: {
              verticalAlign: "middle",
              floating: true,
              text: "Tasks Assigned To Me",
              style: {
                fontSize: "10px",
              },
            },
            plotOptions: {
              pie: {
                dataLabels: {
                  format: "{point.name}: {point.percentage:.1f} %",
                },
                innerSize: "70%",
                events: {
                  click: function (e) {
                    handleclick(e);
                  },
                },
                size: 280,
              },
            },
            series: seriesvalue,
          });
        })
        .catch((response) => {
          console.log(response.data);
        });
    };
    fetchData();
  }, []);
  //console.log(options);
  //const barOptions = options;
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        isPureConfig={true}
      />
    </div>
  );
}
function ByMePie() {
  const [options1, setoptions1] = useState();
  const token = localStorage.access_token;
  const useremail = useSelector((state) => state.userdetails.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleclick(e) {
    //console.log(e.point.attribute);
    dispatch(setassignee(""));
    dispatch(setcreatedby(useremail));
    dispatch(setstatus(e.point.name.toLowerCase()));
    navigate("/welcome/filteredtasks", {
      state: { url: "http://localhost:8000/task/gettasks-multiplefilters" },
    });
  }
  useEffect(() => {
    var seriesvalue = "hi";
    let config = {
      headers: { Authorization: "Bearer " + token },
    };
    const fetchData = async () => {
      await axios
        .get("http://localhost:8000/task/getcreatedbyme", config)
        .then((response) => {
          //console.log(response.data);
          seriesvalue = response.data;
          setoptions1({
            chart: {
              type: "pie",
            },
            title: {
              verticalAlign: "middle",
              floating: true,
              text: "Tasks Created By Me",
              style: {
                fontSize: "10px",
              },
            },
            plotOptions: {
              pie: {
                dataLabels: {
                  format: "{point.name}: {point.percentage:.1f} %",
                },
                innerSize: "70%",
                events: {
                  click: function (e) {
                    handleclick(e);
                  },
                },
                size: 280,
              },
            },
            series: seriesvalue,
          });
        })
        .catch((response) => {
          console.log(response.data);
        });
    };
    fetchData();
  }, []);
  //console.log(options);
  //const barOptions = options;
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options1}
        isPureConfig={true}
      />
    </div>
  );
}
function Allpie() {
  const [options2, setoptions2] = useState();
  const token = localStorage.access_token;
  //const useremail = useSelector((state)=>state.userdetails.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleclick(e) {
    //console.log(e.point.attribute);
    dispatch(setassignee(""));
    dispatch(setcreatedby(""));
    dispatch(setstatus(e.point.name.toLowerCase()));
    navigate("/welcome/filteredtasks", {
      state: { url: "http://localhost:8000/task/getalltasks-statusbased" },
    });
  }
  useEffect(() => {
    var seriesvalue = "hi";
    let config = {
      headers: { Authorization: "Bearer " + token },
    };
    const fetchData = async () => {
      await axios
        .get("http://localhost:8000/task/getalltasksforpie", config)
        .then((response) => {
          //console.log(response.data);
          seriesvalue = response.data;
          setoptions2({
            chart: {
              type: "pie",
            },
            title: {
              verticalAlign: "middle",
              floating: true,
              text: "All Tasks",
              style: {
                fontSize: "10px",
              },
            },
            plotOptions: {
              pie: {
                dataLabels: {
                  format: "{point.name}: {point.percentage:.1f} %",
                },
                innerSize: "70%",
                events: {
                  click: function (e) {
                    handleclick(e);
                  },
                },
                size: 280,
              },
            },
            series: seriesvalue,
          });
        })
        .catch((response) => {
          console.log(response.data);
        });
    };
    fetchData();
  }, []);
  //console.log(options);
  //const barOptions = options;
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options2}
        isPureConfig={true}
      />
    </div>
  );
}
export default ToMePie;
export { ByMePie, Allpie };
