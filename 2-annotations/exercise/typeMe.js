const events = [
  {
    id: "1",
    title: "Thanksgiving Potluck",
    date: "2025-11-29",
    image_url:
      "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=500",
    host_id: 1,
    rsvps: [{ user_id: 1 }, { user_id: "5" }, { user_id: 3 }],
  },
  {
    id: 2,
    title: "EventExpo 2026",
    date: "2026-04-01",
    description:
      "Discover the future of event planning at EventExpo 2026. Network with industry leaders, explore cutting-edge technologies, and attend inspiring workshops.",
    host_id: "3",
  },
];

// Should return an event object, or null if not found
function getEventById(id) {
  return events.filter((e) => e.id === id)[0];
}

// Should return an object with dateString & isPast
function getEventDate(event) {
  const eventDate = new Date(event.date);
  const dateString = eventDate.toDateString();
  const isPast = eventDate < new Date();
  return { dateString, isPast };
}

// Should return a string like '5 going' or '0 went'
const getEventRsvpCount = (event) => {
  const count = event.rsvps.length;
  const { isPast } = getEventDate(event);
  const text = isPast ? "went" : "going";
  return [count, text].join(" ");
};

// Should return a string with the event's title, date, and rsvps
// (if the event exists), or the string 'Event not found' (if not)
const getEventDetails = (eventId) => {
  const event = getEventById(eventId);
  if (event) {
    const { dateString } = getEventDate(event);
    const eventRsvps = getEventRsvpCount(event);
    return `${event.title} on ${dateString}: ${eventRsvps}`;
  }
};

function test() {
  const testDate = (eventId: number | string): string => {
    const event = getEventById(eventId);

    if (event) {
      const date = new Date(event.date).toDateString();
      return date;
    }

    return "";
  };
  const results = [
    {
      id: 1,
      actual: getEventDetails(1),
      expected: `Thanksgiving Potluck on ${testDate(1)}: 3 going`,
    },
    {
      actual: getEventDetails(2),
      expected: `EventExpo 2026 on ${testDate(2)}: 0 going`,
    },
    {
      actual: getEventDetails(404),
      expected: "Event not found",
    },
  ];

  for (let result of results) {
    const label = result.expected === result.actual ? "✅" : "❌";
    console.log(label, result.actual);
  }
}

test();

export { getEventDetails };
