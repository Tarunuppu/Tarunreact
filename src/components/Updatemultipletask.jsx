import axios from "axios";
import React from "react";
import DatePicker from "react-datepicker";
import "./Welcomestyles.css";
class Updatemultipletask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.state = { temp: true };
    this.state = { collection: [] };
    this.state = { email: null };
    this.state = { diffassignees: -1 };
    this.state = { diffcreators: -1 };
    this.state = { token: localStorage.getItem("access_token") };
  }
  static getDerivedStateFromProps(props, state) {
    return {
      show: props.show,
      collection: props.collection,
      email: props.email,
    };
  }

  componentDidUpdate() {
    let config = {
      headers: { Authorization: "Bearer " + this.state.token },
      params: {
        collection: this.state.collection,
      },
    };
    axios
      .get("http://localhost:8000/task/getspecificcolumns", config)
      .then((response) => {
        console.log(response.data);
        let data = response.data;
        let filteredData1 = data.filter(
          (item) => item.assignee !== this.state.email
        );
        let filteredData2 = data.filter(
          (item) => item.createdby !== this.state.email
        );
        if (filteredData1.length !== 0 && filteredData2.length !== 0) {
          alert(
            "Please select tasks in which you are either assignee of all the selected tasks or creator of the all the selected tasks"
          );
        }
        this.setState({ diffassignees: filteredData1.length });
        this.setState({ diffcreators: filteredData2.length });
        this.setState({ temp: false });
      })
      .catch((response) => {
        console.log(response);
      });
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.show !== this.props.show ||
      nextProps.collection !== this.props.collection
    ) {
      return true;
    } else return false;
  }
  handleonclick = (e) => {
    e.preventDefault();
    this.props.onClose();
  };
  render() {
    console.log("i am rendering");
    return (
      <div
        className={this.state.show ? "modal show" : "modal"}
        onClick={this.handleonclick}
      >
        {this.state.temp ? (
          <p>loading...</p>
        ) : (
          <div>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h4 className="modal-title">Update Tasks</h4>
              </div>
              <div className="modal-body">
                {this.state.diffcreators === 0 && (
                  <div>
                    <p>
                      Assignee :
                      <input
                        className="Createtaskfiveinputs"
                        type="text"
                        placeholder="Assignee"
                        // value={upassignee}
                        // onChange={(e) => setupassignee(e.target.value)}
                      />
                    </p>
                    <div className="CreatetaskDatePicker">
                      Due Date :
                      <DatePicker
                        className="Createtaskfiveinputs"
                        // selected={upduedate}
                        // onChange={(date) => setupduedate(date)}
                        showTimeSelect
                      />
                    </div>
                  </div>
                )}
                {this.state.diffassignees === 0 && (
                  <div>
                    <p style={{ marginBottom: 0 + "px" }}>Status :</p>
                    <input
                      className="Createtaskfiveinputs"
                      type="text"
                      placeholder="status"
                      // value={upstatus}
                      // onChange={(e) => setupstatus(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="TaskButton">Submit</button>
                <button className="TaskButton" onClick={this.props.onClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Updatemultipletask;
