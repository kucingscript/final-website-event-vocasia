export const headerLists = [
  { label: "Home", target: "/" },
  { label: "About", target: "/about" },
  { label: "Contact", target: "/contact" },
];

export const featuredEvents = [
  {
    pricing: "$229",
    title: "Learn Jira for Sprint Design Venture",
    subtitle: "Product Design",
    description: "Bandung, 22 Jan 2022",
  },
  {
    pricing: "$330",
    title: "Team Management for Long Term",
    subtitle: "Product Design",
    description: "Jakarta, 11 Aug 2022",
  },
  {
    pricing: "$221",
    title: "Set Marketing Target For SaaS Bii",
    subtitle: "Product Design",
    description: "Bandung, 22 Jan 2022",
  },
  {
    pricing: "$90",
    title: "Google Adsense from Zero to Big Bucks",
    subtitle: "SEO Marketing",
    description: "Jakarta, 11 Aug 2022",
  },
];

export const stories = [
  { title: "190K+", subtitle: "Events Created" },
  { title: "3M", subtitle: "People Joined" },
  { title: "5K+", subtitle: "Success Startup" },
  { title: "113K+", subtitle: "Top Speakers" },
];

export const footerLinks = [
  {
    title: "Features",
    links: [
      { label: "Virtual" },
      { label: "Pricing" },
      { label: "Merchant" },
      { label: "Tickets" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Jobs" },
      { label: "API" },
      { label: "Press" },
      { label: "Sitemap" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Guidebook" },
      { label: "Inspiration" },
      { label: "Community" },
      { label: "Tools" },
    ],
  },
];

export const detailedEvents = [
  {
    title:
      "Hours trying different things and getting nowhere makes them feel like giving up on marketing altogether.",
  },
  {
    title:
      "Hours trying different things and getting nowhere makes them feel like giving up on marketing altogether.",
  },
  {
    title:
      "Hours trying different things and getting nowhere makes them feel like giving up on marketing altogether.",
  },
];

export const loginForms = [
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "vocasia@gmail.com",
  },
  {
    id: "password",
    label: "Password (6 Characters)",
    type: "password",
    placeholder: "Type your password",
  },
];

export const registerForms = [
  {
    id: "firstname",
    label: "First Name",
    type: "text",
    placeholder: "First name here",
  },
  {
    id: "lastname",
    label: "Last Name",
    type: "text",
    placeholder: "Last name here",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "vocasia@gmail.com",
  },
  {
    id: "password",
    label: "Password (6 Characters)",
    type: "password",
    placeholder: "Type your password",
  },
];

export const ordersEvColumns = [
  { header: "Title", accessorKey: "event_title" },
  { header: "Price", accessorKey: "event_price" },
  { header: "Place", accessorKey: "event_place" },
  { header: "Time", accessorKey: "event_time" },
  { header: "Date", accessorKey: "event_date" },
  { header: "Announcer", accessorKey: "speaker_name" },
  { header: "Occupation", accessorKey: "speaker_occupation" },
];

export const createEvents = [
  {
    id: "event_title",
    label: "Event Title",
    type: "text",
  },
  {
    id: "event_details",
    label: "Event Details",
    type: "text",
  },
  {
    id: "event_price",
    label: "Event Price",
    type: "number",
  },
  {
    id: "event_place",
    label: "Event Place",
    type: "text",
  },
  {
    id: "event_time",
    label: "Event Time",
    type: "text",
  },
  {
    id: "event_date",
    label: "Event Date",
    type: "date",
  },
  {
    id: "event_images",
    label: "Event Images",
    type: "file",
  },
  {
    id: "speaker_name",
    label: "Speaker's Name",
    type: "text",
  },
  {
    id: "speaker_occupation",
    label: "Speaker's Occupation",
    type: "text",
  },
];

export const requiredFields = [
  "event_title",
  "event_details",
  "event_price",
  "event_place",
  "event_time",
  "event_date",
  "event_images",
  "speaker_name",
  "speaker_occupation",
];
