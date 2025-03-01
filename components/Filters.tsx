"use client";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { parseAsIsoDateTime, useQueryState } from "nuqs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Filters = () => {
  const [dateFilter, setDateFilter] = useQueryState(
    "date",
    parseAsIsoDateTime
      .withDefault(new Date("1970-01-01"))
      .withOptions({ shallow: false })
  );
  const [statusFilter, setStatusFilter] = useQueryState("status", {
    defaultValue: "all",
    throttleMs: 300,
    shallow: false,
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDateFilter(date);
    } else {
      setDateFilter(new Date("1970-01-01"));
    }
  };

  const clearDateFilter = () => {
    setDateFilter(new Date("1970-01-01"));
  };

  const isDefaultDate = (date: Date) => {
    return date.getTime() === new Date("1970-01-01").getTime();
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateFilter && !isDefaultDate(dateFilter) ? (
              format(dateFilter, "PPP")
            ) : (
              <span>Filter by date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={!isDefaultDate(dateFilter) ? dateFilter : undefined}
            onSelect={handleDateSelect}
            initialFocus
          />
          {!isDefaultDate(dateFilter) && (
            <div className="p-3 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearDateFilter}
                className="w-full"
              >
                Clear date filter
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>

      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-fit">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Todo</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filters;
