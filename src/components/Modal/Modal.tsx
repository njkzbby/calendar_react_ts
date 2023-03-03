import React from "react";
import { json } from "stream/consumers";
import { formatDate } from "../../utils/helpers/date";

import "./Modal.css";

interface ModalProps {
  locale?: string;
  active: boolean;
  setActive: any;
  date: any;
}

export const Modal: React.FC<ModalProps> = ({
  locale = "default",
  active,
  setActive,
  date,
}) => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const targets = e.target as any;
    const eventDetails: Record<string, string> = {
      eventName: "",
      eventDescription: "",
      eventDate: "",
      eventParticipants: "",
    };
    for (const target of targets) {
      if (target.name in eventDetails) {
        eventDetails[target.name] = target.value;
      }
    }

    const strEvents = localStorage.getItem("events") || "[]";
    const events = JSON.parse(strEvents);
    events.push(eventDetails);
    localStorage.setItem("events", JSON.stringify(events));
    e.preventDefault();
    console.log(events);
  };
  console.log(date.date);
  return (
    <>
      <div
        className={active ? "modal active" : "modal"}
        onClick={() => setActive(false)}
      >
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title">
              <button onClick={() => setActive(false)} className="button">
                Close
              </button>
            </div>
          </div>
          <div className="modal-body">
            <form onSubmit={handleFormSubmit} className="inputs">
              <div className="important-inputs">
                <input
                  name="eventName"
                  className="modal-input"
                  placeholder="Название события"
                  type="text"
                />
                <input
                  readOnly
                  value={formatDate(date.date, "DDD DD MMM YYYY")}
                  name="eventDate"
                  className="modal-input"
                  placeholder="Дата события"
                  type="text"
                />
                <input
                  name="eventParticipants"
                  className="modal-input"
                  placeholder="Участники"
                  type="text"
                />
              </div>
              <div className="descripthion-input">
                <input
                  name="eventDescription"
                  className="modal-input"
                  placeholder="Описание"
                  type="text"
                />
              </div>
              <input type="submit"></input>
            </form>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </>
  );
};
