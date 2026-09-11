export const locations = [
  {
    id: "loc-nashik",
    name: "Nashik",
    state: "MH",
    type: "city",
    popular: true,
  },
  {
    id: "loc-mumbai",
    name: "Mumbai",
    state: "MH",
    type: "city",
    popular: true,
  },
  {
    id: "loc-pune",
    name: "Pune",
    state: "MH",
    type: "city",
    popular: true,
  },
  {
    id: "loc-shirdi",
    name: "Shirdi",
    state: "MH",
    type: "city",
    popular: true,
  },
  {
    id: "loc-aurangabad",
    name: "Aurangabad",
    state: "MH",
    type: "city",
    popular: true,
  },
  {
    id: "loc-lonavala",
    name: "Lonavala",
    state: "MH",
    type: "city",
    popular: true,
  },
  { id: "loc-khandala", name: "Khandala", state: "MH", type: "city" },
  {
    id: "loc-mahabaleshwar",
    name: "Mahabaleshwar",
    state: "MH",
    type: "city",
    popular: true,
  },
  {
    id: "loc-trimbakeshwar",
    name: "Trimbakeshwar",
    state: "MH",
    type: "landmark",
  },
  {
    id: "loc-shani-shingnapur",
    name: "Shani Shingnapur",
    state: "MH",
    type: "landmark",
  },
  {
    id: "loc-nashik-road",
    name: "Nashik Road Railway Station",
    state: "MH",
    type: "railway-station",
  },
  {
    id: "loc-pune-station",
    name: "Pune Railway Station",
    state: "MH",
    type: "railway-station",
  },
  { id: "loc-goa", name: "Goa", state: "Goa", type: "city" },
  { id: "loc-nagpur", name: "Nagpur", state: "MH", type: "city" },
  { id: "loc-kolhapur", name: "Kolhapur", state: "MH", type: "city" },
];

export const popularLocations = locations.filter(
  (location) => location.popular,
);
