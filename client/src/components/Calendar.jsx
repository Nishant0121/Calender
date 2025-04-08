import React, { useEffect, useState } from "react";
import {
  Calendar as BigCalendarBase,
  Views,
  dateFnsLocalizer,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";

import { useSelector, useDispatch } from "react-redux";
import EventModal from "./EventModal";
import { fetchEvents, updateEvent } from "../features/events/eventSlice";

const locales = { "en-US": import("date-fns/locale/en-US") };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const DnDCalendar = withDragAndDrop(BigCalendarBase);

// category → color map
const categoryColors = {
  exercise: "#34D399",
  eating: "#FBBF24",
  work: "#3B82F6",
  relax: "#A78BFA",
  family: "#F87171",
  social: "#FB923C",
};

const eventStyleGetter = (event) => ({
  style: {
    backgroundColor: categoryColors[event.category] || "#3B82F6",
    borderRadius: "0.5rem",
    opacity: 0.9,
    color: "white",
    border: "none",
    display: "block",
  },
});

export default function MyCalendar() {
  const dispatch = useDispatch();
  const rawEvents = useSelector((state) => state.events.items);

  // convert ISO strings → Date and validate events
  const events = rawEvents
    .filter((ev) => ev && ev.title && ev.start && ev.end) // Filter out invalid events
    .map((ev) => ({
      ...ev,
      start: new Date(ev.start),
      end: new Date(ev.end),
    }));

  // track screen size
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [slotInfo, setSlotInfo] = useState(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // create new
  const handleSelectSlot = (slot) => {
    setSlotInfo({
      start: slot.start.toISOString().slice(0, 16),
      end: slot.end.toISOString().slice(0, 16),
    });
    setModalOpen(true);
  };

  // move
  const handleEventDrop = ({ event, start, end }) => {
    dispatch(
      updateEvent({
        _id: event._id,
        title: event.title,
        category: event.category,
        start: start.toISOString(),
        end: end.toISOString(),
      })
    );
  };

  // resize
  const handleEventResize = ({ event, start, end }) => {
    dispatch(
      updateEvent({
        _id: event._id,
        title: event.title,
        category: event.category,
        start: start.toISOString(),
        end: end.toISOString(),
      })
    );
  };

  return (
    <div className="calendar-container max-w-[1080px] mx-auto w-full overflow-auto">
      <DnDCalendar
        localizer={localizer}
        events={events}
        defaultView={isMobile ? Views.DAY : Views.WEEK}
        views={
          isMobile
            ? [Views.DAY, Views.AGENDA]
            : [Views.WEEK, Views.DAY, Views.AGENDA]
        }
        selectable
        resizable
        onSelectSlot={handleSelectSlot}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        eventPropGetter={eventStyleGetter}
        style={{ height: isMobile ? "70vh" : "80vh", minWidth: "300px" }}
        popup={isMobile}
      />
      <EventModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        slot={slotInfo}
      />
    </div>
  );
}
