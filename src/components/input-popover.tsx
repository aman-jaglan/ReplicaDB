"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function InputPopover({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(value);
            setOpen(false);
          }}
          className="flex gap-2"
        >
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value..."
          />
          <Button type="submit">Save</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}