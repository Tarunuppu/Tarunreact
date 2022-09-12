import axios from "axios";
import React from "react";
import DatePicker from "react-datepicker";
import "./Welcomestyles.css";
class Updatemultipletask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.state = { temp: true };
    this.state = { collection: new Array(0) };
    this.state = { collectionsize: 0 };
    this.state = { email: null };
    this.state = { sameAssignees: -1 };
    this.state = { sameCreators: -1 };
    this.state = { assignee: null };
    this.state = { dueDate: null };
    this.state = { status: null };
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
    console.log("i am in componentDidUpdate");
    let config = {
      headers: { Authorization: "Bearer " + this.state.token },
      params: {
        collection: this.state.collection,
      },
    };
    axios
      .get("http://localhost:8000/task/getspecificcolumns", config)
      .then((response) => {
        console.log(this.state.collection.length);
        this.setState({ collectionSize: this.state.collection.length });
        console.log("printing size", this.state.collectionSize);
        let data = response.data;
        if (
          data.assignee !== this.state.collection.length &&
          data.creator !== this.state.collection.length
        ) {
          alert(
            "Please select tasks in which you are either assignee of all the selected tasks or creator of the all the selected tasks"
          );
        }
        this.setState({ sameAssignees: data.assignee });
        this.setState({ sameCreators: data.creator });
        this.setState({ temp: false });
      })
      .catch((response) => {
        console.log(response);
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("i am in shouldComponentUpdate");
    console.log("printing the same ", this.state.collectionSize);
    if (
      nextProps.show !== this.props.show ||
      nextProps.collection !== this.props.collection ||
      nextState.sameAssignees !== this.state.sameAssignees ||
      nextState.sameCreators !== this.state.sameCreators ||
      nextState.dueDate !== this.state.dueDate
    ) {
      return true;
    } else return false;
  }
  handleonclick = (e) => {
    e.preventDefault();
    this.props.onClose();
  };
  handlesubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:8000/task/update-multiple-tasks",
        {
          collection: this.state.collection,
          assignee: this.state.assignee,
          duedate: this.state.dueDate,
          status: this.state.status,
        },
        {
          headers: { Authorization: "Bearer " + this.state.token },
        }
      )
      .then((response) => {
        // alert("Task Updated");
        console.log(response.data);
      })
      .catch((response) => {
        alert("Error");
        console.log(response);
      });
    // if (diffassignees == 0) {
    // }
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
                {this.state.sameCreators === this.state.collectionSize && (
                  <div>
                    <p>
                      Assignee :
                      <input
                        className="Createtaskfiveinputs"
                        type="text"
                        placeholder="Assignee"
                        value={this.state.assignee}
                        onChange={(e) =>
                          this.setState({ assignee: e.target.value })
                        }
                      />
                    </p>
                    <div className="CreatetaskDatePicker">
                      Due Date :
                      <DatePicker
                        className="Createtaskfiveinputs"
                        selected={this.state.dueDate}
                        onChange={(date) => this.setState({ dueDate: date })}
                        showTimeSelect
                      />
                    </div>
                  </div>
                )}
                {this.state.sameAssignees === this.state.collectionSize && (
                  <div>
                    <p style={{ marginBottom: 0 + "px" }}>Status :</p>
                    <input
                      className="Createtaskfiveinputs"
                      type="text"
                      placeholder="status"
                      value={this.state.status}
                      onChange={(e) =>
                        this.setState({ status: e.target.value })
                      }
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="TaskButton" onClick={this.handlesubmit}>
                  Submit
                </button>
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
