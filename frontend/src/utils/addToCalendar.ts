export interface CalendarEvent {
  title: string;
  description?: string;
  location?: string;
  start: string;
  end?: string;
}

export function downloadICS(event: CalendarEvent) {
  //format: YYYYMMDDTHHMMSS
  const fmt = (d: string) => d.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const dtStart = fmt(event.start);
  const dtEnd = event.end ? fmt(event.end) : dtStart;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description || ""}`,
    `LOCATION:${event.location || ""}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.title.replace(/\s+/g, "_")}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
