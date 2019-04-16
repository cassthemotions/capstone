import React, { Component } from "react";
import { DayPilot, DayPilotMonth } from "daypilot-pro-react";
import "./Calendar.css";

class Month extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventHeight: 30,
      headerHeight: 30,
      cellMarginBottom: 10,
      cellHeaderHeight: 20,
      eventMarginBottom: 5,
      eventEndSpec: "Date",
      onBeforeEventRender: args => {
        args.data.areas = [
          {
            top: 6,
            right: 10,
            width: 12,
            height: 14,
            icon: "icon-triangle-down",
            visibility: "Visible",
            action: "ContextMenu",
            style:
              "font-size: 12px; background-color: #fff; border: 1px solid #ccc; border-radius: 5px; padding: 3px 3px 0px 2px; cursor:pointer;"
          }
        ];
      },
      contextMenu: new DayPilot.Menu({
        items: [
          {
            text: "Delete",
            onClick: args => {
              var e = args.source;
              this.calendar.events.remove(e);
            }
          },
          {
            text: "-"
          },
          {
            text: "Blue",
            icon: "icon icon-blue",
            color: "#3c78d8",
            onClick: args => this.updateColor(args.source, args.item.color)
          },
          {
            text: "Green",
            icon: "icon icon-green",
            color: "#6aa84f",
            onClick: args => this.updateColor(args.source, args.item.color)
          },
          {
            text: "Yellow",
            icon: "icon icon-yellow",
            color: "#e69138",
            onClick: args => this.updateColor(args.source, args.item.color)
          },
          {
            text: "Red",
            icon: "icon icon-red",
            color: "#cc0000",
            onClick: args => this.updateColor(args.source, args.item.color)
          },
          {
            text: "Auto",
            color: "auto",
            onClick: args => this.updateColor(args.source, args.item.color)
          }
        ]
      }),
      onTimeRangeSelected: args => {
        let dp = this.calendar;
        DayPilot.Modal.prompt("Create a new event:", "Event 1").then(function(
          modal
        ) {
          dp.clearSelection();
          if (!modal.result) {
            return;
          }
          dp.events.add(
            new DayPilot.Event({
              start: args.start,
              end: args.end,
              id: DayPilot.guid(),
              text: modal.result
            })
          );
        });
      }
    };
  }

  componentDidMount() {
    let first = DayPilot.Date.today().firstDayOfMonth();

    // load resource and event data
    this.setState({
      startDate: DayPilot.Date.today(),
      events: [
        {
          id: 1,
          text: "Event 1",
          start: first.addDays(3),
          end: first.addDays(5),
          backColor: "#cc0000"
        },
        {
          id: 2,
          text: "Event 2",
          start: first.addDays(3),
          end: first.addDays(4),
          backColor: "#e69138"
        },
        {
          id: 3,
          text: "Event 3",
          start: first.addDays(3),
          end: first.addDays(3),
          backColor: "#6aa84f"
        },
        {
          id: 4,
          text: "Event 4",
          start: first.addDays(10),
          end: first.addDays(10),
          backColor: "#3c78d8"
        },
        {
          id: 5,
          text: "Event 5",
          start: first.addDays(10),
          end: first.addDays(10)
        }
      ]
    });
  }

  updateColor(e, color) {
    e.data.backColor = color;
    this.calendar.events.update(e);
  }

  render() {
    var { ...config } = this.state;
    return (
      <div>
        <DayPilotMonth
          {...config}
          ref={component => {
            this.calendar = component && component.control;
          }}
        />
      </div>
    );
  }
}

export default Month;
