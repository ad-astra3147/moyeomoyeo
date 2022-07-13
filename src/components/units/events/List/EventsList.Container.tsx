import EventsListUI from "./EventsList.Prsenter";
import { useState, useEffect } from "react";
import { useMoveToPage } from "../../../commons/hooks/useMoveToPage";

export default function EventList() {
  const { onClickMoveToPage } = useMoveToPage();
  const [activedTab, setActivedTab] = useState(null);
  const [datePick, setDatePick] = useState(true);
  const [openEvents, setOpenEvents] = useState(false);
  const [ourEvents, setOurEvents] = useState(false);

  const onClickDate = () => {
    setDatePick(true);
    setOpenEvents(false);
    setOurEvents(false);
  };

  const onClickOpenEventTap = () => {
    setDatePick(false);
    setOpenEvents(true);
    setOurEvents(false);
  };
  const onClickOurEventTap = () => {
    setDatePick(false);
    setOpenEvents(false);
    setOurEvents(true);
  };

  return (
    <EventsListUI
      onClickMoveToPage={onClickMoveToPage}
      onClickOpenEventTap={onClickOpenEventTap}
      onClickOurEventTap={onClickOurEventTap}
      onClickDate={onClickDate}
      datePick={datePick}
      activedTab={activedTab}
      openEvents={openEvents}
      ourEvents={ourEvents}
    />
  );
}
