import { useEffect, useState, useRef } from "react";
import useFormContext from "../../../hooks/useFormContext";

import format from "date-fns/format";
import { addDays } from "date-fns";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { styled } from "styled-components";

const Container = styled.div`
  display: inline-block;
  position: relative;
`;

const Input = styled.input`
  width: 338px;
  font-size: 22px;
  padding: 5px 8px 4px 8px;
  border-radius: 3px;
  border: 1px solid #666;
`;

const Calendar = () => {
  const { setTimePeriod } = useFormContext();
  // Date state
  const [range, setRange] = useState([
    {
      startDate: addDays(new Date(), -14),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    setTimePeriod({ startDate: range[0].startDate, endDate: range[0].endDate });
  }, [range, setTimePeriod]);

  // Is the calendar opened or closed
  const [open, setOpen] = useState(false);

  // Get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // Event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  });

  // Hide dropdown menu for the calendar on pressing ESC
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <Container>
      <Input
        value={`${format(range[0].startDate, "dd/MM/yyyy")} to ${format(
          range[0].endDate,
          "dd/MM/yyyy"
        )}`}
        readOnly
        onClick={() => setOpen((open) => !open)}
      />
      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calendarElement"
          />
        )}
      </div>
    </Container>
  );
};

export default Calendar;
