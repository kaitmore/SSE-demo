import React, { Component } from "react";
import axios from "axios";

import Message from "./Message";
import AppWrapper from "./AppWrapper";
import MessagesContainer from "./MessagesContainer";
import TextInput from "./TextInput";
import SubmitButton from "./SubmitButton";
import SideBar from "./SideBar";
import NameInput from "./NameInput";

class App extends Component {
  state = { messages: [], newMessage: "", name: "", messageError: false };

  // Declare an EventSource
  eventSource = new EventSource("http://localhost:3000/stream");

  componentDidMount() {
    // Handler for events without an event type specified
    this.eventSource.onmessage = e => {
      const newMessageObj = JSON.parse(e.data);
      const newMessage = {
        ...newMessageObj,
        time: Date(e.timeStamp)
      };
      this.setState({ messages: [newMessage, ...this.state.messages] });
    };

    this.eventSource.onopen = e => {
      console.log("Connected to the event server");
    };
  }

  componentWillUnmount() {
    this.eventSource.close();
  }

  handleSubmit = e => {
    if (this.state.newMessage === "") {
      console.log("empty");
      this.setState({ messageError: true });
    } else {
      axios
        .post(
          "http://localhost:3000/message",
          `message=${this.state.newMessage}&name=${this.state.name}`
        )
        .then(() => {
          this.setState({ newMessage: "" });
        });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "newMessage") {
      this.setState({ messageError: false });
    }
  };

  render() {
    return (
      <AppWrapper>
        <SideBar>
          <NameInput
            onChange={this.handleChange}
            value={this.state.name}
            name="name"
          />
          <TextInput
            onChange={this.handleChange}
            value={this.state.newMessage}
            name="newMessage"
            messageError={this.state.messageError}
          />
          <SubmitButton onClick={this.handleSubmit}>Send Tweet</SubmitButton>
        </SideBar>
        <MessagesContainer>
          {this.state.messages.map(({ message, user, time }, idx) => (
            <Message key={message | idx}>
              <div style={{ paddingBottom: "10px" }}>
                <span style={{ fontSize: "14px", fontWeight: 600 }}>
                  {user}
                </span>
              </div>
              {message}
              <div
                style={{
                  fontSize: "12px",
                  color: "lightgray",
                  paddingTop: "10px"
                }}
              >
                {time}
              </div>
            </Message>
          ))}
        </MessagesContainer>
      </AppWrapper>
    );
  }
}

export default App;
