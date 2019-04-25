import React, { Component } from "react";
import MessagePane from "./MessagePane";
import ChannelList from "./ChannelList";
import "./Chat.css";

const messages = [
  {
    id: 1,
    text: "hi",
    author: "Ben",
    channel_id: 1
  },
  {
    id: 2,
    text: "hi to you too",
    author: "Jen",
    channel_id: 1
  },
  {
    id: 3,
    text: "hi from another channel",
    author: "Meg",
    channel_id: 2
  },
  {
    id: 4,
    text: "hi to you too from another channel",
    author: "Jeff",
    channel_id: 2
  }
];

const channels = [
  { id: 1, name: "General room" },
  { id: 2, name: "Security Team" },
  { id: 3, name: "Watercooler conversation" }
];

class App extends Component {
  constructor() {
    super();

    this.state = {
      messages,
      channels,
      selectedChannelId: channels[0].id
    };

    this.onSendMessage = this.onSendMessage.bind(this);
    this.onChannelSelect = this.onChannelSelect.bind(this);
    this.filteredMessages = this.filteredMessages.bind(this);
  }

  componentDidMount() {
    console.log("here");
  }

  onSendMessage(author, text) {
    const new_message = {
      id: this.state.messages[this.state.messages.length - 1].id + 1,
      author,
      text,
      channel_id: 1
    };

    const messages = [...this.state.messages, new_message];
    this.setState({ messages });
  }

  onChannelSelect(id) {
    this.setState({ selectedChannelId: id });
  }

  filteredMessages() {
    return this.state.messages.filter(
      ({ channel_id }) => channel_id === this.state.selectedChannelId
    );
  }

  render() {
    return (
      <div className="App">
        <ChannelList
          channels={this.state.channels}
          selectedChannelId={this.state.selectedChannelId}
          onSelect={this.onChannelSelect}
        />
        <MessagePane
          messages={this.filteredMessages()}
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }
}

export default App;
