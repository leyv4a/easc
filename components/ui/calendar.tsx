"use client"
import * as React from "react"
import { DayPicker } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CalendarProps {
  className?: string
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: { before: Date }
  initialFocus?: boolean
  showOutsideDays?: boolean
}

function Calendar({
  className,
  selected,
  onSelect,
  disabled,
  showOutsideDays = true,
}: CalendarProps) {
  return (
    <DayPicker
      mode="single"
      showOutsideDays={showOutsideDays}
      selected={selected}
      onSelect={onSelect}
      disabled={disabled}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-3",
        month_caption: "flex justify-center pt-1 relative items-center h-8",
        caption_label: "text-sm font-semibold text-[#0B1E2D] capitalize",
        nav: "flex items-center gap-1",
        button_previous: "absolute left-1 h-7 w-7 bg-transparent p-0 rounded-lg hover:bg-[#F8F5F0] flex items-center justify-center transition-colors text-[#0B1E2D]/50 hover:text-[#0B1E2D]",
        button_next: "absolute right-1 h-7 w-7 bg-transparent p-0 rounded-lg hover:bg-[#F8F5F0] flex items-center justify-center transition-colors text-[#0B1E2D]/50 hover:text-[#0B1E2D]",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-[#0B1E2D]/35 w-9 font-medium text-[0.75rem] text-center uppercase",
        weeks: "mt-2 space-y-1",
        week: "flex",
        day: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day_button: "h-9 w-9 p-0 font-normal rounded-xl text-[#0B1E2D] hover:bg-[#F8F5F0] transition-colors w-full",
        selected: "[&>button]:!bg-[#00AEEF] [&>button]:!text-white [&>button]:hover:!bg-[#0090c7] [&>button]:font-semibold",
        today: "[&>button]:bg-[#0B1E2D]/6 [&>button]:font-semibold",
        outside: "[&>button]:text-[#0B1E2D]/25",
        disabled: "[&>button]:text-[#0B1E2D]/20 [&>button]:cursor-not-allowed [&>button]:hover:bg-transparent",
        hidden: "invisible",
      }}
      components={{
        Chevron: ({ orientation }: { orientation?: string }) =>
          orientation === "left"
            ? <ChevronLeft className="h-4 w-4" />
            : <ChevronRight className="h-4 w-4" />,
      }}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
