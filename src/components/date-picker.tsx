"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export function DatePicker({
  selected,
  onSelect,
}: {
  selected?: Date;
  onSelect?: (date?: Date) => void;
}) {
  const [date, setDate] = React.useState<Date | undefined>(selected);

  React.useEffect(() => {
    onSelect?.(date);
  }, [date, onSelect]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}