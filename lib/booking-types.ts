export interface Accommodation {
  id: string;
  name: string;
  type: "glamping" | "camping" | "homestay";
  image: string;
  price: number;
  rating: number;
  location: string;
  description: string;
}

export interface Activity {
  id: string;
  name: string;
  image: string;
  price: number;
  duration: string;
  description: string;
  popular?: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface CartItem {
  id: string;
  type: "accommodation" | "activity";
  name: string;
  image: string;
  price: number;
  quantity: number;
  date?: string;
  nights?: number;
  timeSlot?: string;
}

export interface GuestInfo {
  name: string;
  email: string;
  phone: string;
}

export interface BookingConfirmation {
  ticketNumber: string;
  items: CartItem[];
  guestInfo: GuestInfo;
  totalPrice: number;
  bookingDate: string;
}

export const accommodations: Accommodation[] = [
  {
    id: "glamping-1",
    name: "Glamping at Mount Batur",
    type: "glamping",
    image: "/images/glamping.jpg",
    price: 850000,
    rating: 4.9,
    location: "Capolaga Highland",
    description: "Luxury tent with mountain view and private deck",
  },
  {
    id: "camping-1",
    name: "Riverside Camping",
    type: "camping",
    image: "/images/camping.jpg",
    price: 350000,
    rating: 4.7,
    location: "Capolaga Riverside",
    description: "Traditional camping by the beautiful river",
  },
  {
    id: "homestay-1",
    name: "Forest Homestay",
    type: "homestay",
    image: "/images/homestay.jpg",
    price: 550000,
    rating: 4.8,
    location: "Capolaga Village",
    description: "Cozy wooden cabin surrounded by nature",
  },
];

export const activities: Activity[] = [
  {
    id: "rafting-1",
    name: "River Rafting",
    image: "/images/rafting.jpg",
    price: 250000,
    duration: "2-3 hours",
    description: "Exciting white water rafting adventure",
    popular: true,
  },
  {
    id: "atv-1",
    name: "ATV Adventure",
    image: "/images/atv.jpg",
    price: 350000,
    duration: "1-2 hours",
    description: "Thrilling ATV ride through forest trails",
    popular: true,
  },
  {
    id: "paragliding-1",
    name: "Paralayang",
    image: "/images/paragliding.jpg",
    price: 500000,
    duration: "30-45 mins",
    description: "Tandem paragliding with stunning views",
  },
  {
    id: "hotspring-1",
    name: "Hot Spring Soak",
    image: "/images/hotspring.jpg",
    price: 75000,
    duration: "Unlimited",
    description: "Relaxing natural hot spring experience",
  },
];

export const timeSlots: TimeSlot[] = [
  { id: "1", time: "08:00 AM", available: true },
  { id: "2", time: "09:00 AM", available: true },
  { id: "3", time: "10:00 AM", available: false },
  { id: "4", time: "11:00 AM", available: true },
  { id: "5", time: "01:00 PM", available: true },
  { id: "6", time: "02:00 PM", available: false },
  { id: "7", time: "03:00 PM", available: true },
  { id: "8", time: "04:00 PM", available: true },
];
