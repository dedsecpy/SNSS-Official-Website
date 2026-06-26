export interface SchoolEvent {
  id: string; // Changed to string for easier URL routing
  dateDay: string;
  dateMonth: string;
  title: string;
  description: string; // short description for cards
  image: string;
  fullDescription: string; // detailed description for page
  location: string;
  time: string;
}

export const eventsData: SchoolEvent[] = [
  {
    id: "1",
    dateDay: "12",
    dateMonth: "MAY",
    title: "National Cadet Corps (NCC) Program",
    description: "Students participating in the NCC training program with officials, promoting discipline and leadership.",
    image: "/event-1.jpg",
    fullDescription: "Our students successfully completed the rigorous National Cadet Corps (NCC) training program. This event brought together officials from various branches to instill discipline, leadership, and a sense of responsibility in our youth. The program included physical training, drill exercises, and sessions on civic duties, showcasing the commitment of SNSS to holistic development.",
    location: "SNSS Main Ground",
    time: "08:00 AM - 02:00 PM"
  },
  {
    id: "2",
    dateDay: "08",
    dateMonth: "MAY",
    title: "Women's Sports Team Excellence",
    description: "Our outstanding girls' sports team proudly representing SNSS in regional tournaments.",
    image: "/event-2.jpg",
    fullDescription: "The girls' sports team of Shree Narayan Secondary School demonstrated exceptional talent and teamwork at the recent regional tournaments. Competing across multiple disciplines including volleyball, basketball, and athletics, they secured top positions and brought immense pride to the school. This achievement highlights our continuous support for women in sports and extracurricular excellence.",
    location: "Regional Sports Complex, Sarlahi",
    time: "09:00 AM - 04:00 PM"
  },
  {
    id: "3",
    dateDay: "24",
    dateMonth: "APR",
    title: "Taekwondo Championship Winners",
    description: "Proud students showcasing their medals from the 25th ITF Taekwondo National Championship.",
    image: "/event-3.jpg",
    fullDescription: "Our martial arts prodigies made history at the 25th ITF Taekwondo National Championship by securing multiple gold and silver medals. The rigorous training and unwavering dedication of our students paid off on the national stage. We extend our heartiest congratulations to the participants and their coaches for this stellar performance.",
    location: "National Stadium, Kathmandu",
    time: "10:00 AM - 05:00 PM"
  },
  {
    id: "4",
    dateDay: "15",
    dateMonth: "APR",
    title: "Faculty Cultural Celebration",
    description: "Our dedicated faculty members gathering to celebrate a vibrant cultural event at the school premises.",
    image: "/event-4.jpg",
    fullDescription: "In a beautiful display of unity and tradition, the faculty members of SNSS came together to celebrate our rich cultural heritage. Dressed in vibrant traditional attire, teachers and staff participated in folk dances, musical performances, and shared traditional delicacies. This celebration reinforced the strong bond within our educational community.",
    location: "SNSS Auditorium",
    time: "11:00 AM - 03:00 PM"
  },
  {
    id: "5",
    dateDay: "02",
    dateMonth: "APR",
    title: "Annual Sports Day Prize Distribution",
    description: "Honoring our top athletes and sports teams for their incredible performance in the annual sports meet.",
    image: "/event-5.jpg",
    fullDescription: "The Annual Sports Day concluded with a grand prize distribution ceremony. Medals, trophies, and certificates were awarded to the outstanding athletes who excelled in various track and field events. The energy and sportsmanship displayed by all the houses were truly commendable, making this year's sports meet a memorable success.",
    location: "SNSS Sports Field",
    time: "02:00 PM - 05:00 PM"
  }
];
