"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type {
  CartItem,
  GuestInfo,
  Accommodation,
  Activity,
  BookingConfirmation,
} from "./booking-types";

interface BookingState {
  step: number;
  selectedAccommodation: Accommodation | null;
  selectedDate: Date | undefined;
  selectedTimeSlot: string | null;
  nights: number;
  cart: CartItem[];
  guestInfo: GuestInfo;
  paymentMethod: string;
  confirmation: BookingConfirmation | null;
}

interface BookingContextType extends BookingState {
  setStep: (step: number) => void;
  selectAccommodation: (accommodation: Accommodation) => void;
  setSelectedDate: (date: Date | undefined) => void;
  setSelectedTimeSlot: (slot: string) => void;
  setNights: (nights: number) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  setGuestInfo: (info: Partial<GuestInfo>) => void;
  setPaymentMethod: (method: string) => void;
  getTotalPrice: () => number;
  confirmBooking: () => void;
  resetBooking: () => void;
  addActivityToCart: (activity: Activity) => void;
}

const initialState: BookingState = {
  step: 1,
  selectedAccommodation: null,
  selectedDate: undefined,
  selectedTimeSlot: null,
  nights: 1,
  cart: [],
  guestInfo: { name: "", email: "", phone: "" },
  paymentMethod: "",
  confirmation: null,
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(initialState);

  const setStep = (step: number) => {
    setState((prev) => ({ ...prev, step }));
  };

  const selectAccommodation = (accommodation: Accommodation) => {
    setState((prev) => ({ ...prev, selectedAccommodation: accommodation }));
  };

  const setSelectedDate = (date: Date | undefined) => {
    setState((prev) => ({ ...prev, selectedDate: date }));
  };

  const setSelectedTimeSlot = (slot: string) => {
    setState((prev) => ({ ...prev, selectedTimeSlot: slot }));
  };

  const setNights = (nights: number) => {
    setState((prev) => ({ ...prev, nights }));
  };

  const addToCart = (item: CartItem) => {
    setState((prev) => {
      const existingIndex = prev.cart.findIndex((i) => i.id === item.id);
      if (existingIndex >= 0) {
        const newCart = [...prev.cart];
        newCart[existingIndex].quantity += item.quantity;
        return { ...prev, cart: newCart };
      }
      return { ...prev, cart: [...prev.cart, item] };
    });
  };

  const removeFromCart = (id: string) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.filter((item) => item.id !== id),
    }));
  };

  const updateCartItemQuantity = (id: string, quantity: number) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  };

  const setGuestInfo = (info: Partial<GuestInfo>) => {
    setState((prev) => ({
      ...prev,
      guestInfo: { ...prev.guestInfo, ...info },
    }));
  };

  const setPaymentMethod = (method: string) => {
    setState((prev) => ({ ...prev, paymentMethod: method }));
  };

  const getTotalPrice = () => {
    return state.cart.reduce((total, item) => {
      const itemTotal = item.price * item.quantity * (item.nights || 1);
      return total + itemTotal;
    }, 0);
  };

  const addActivityToCart = (activity: Activity) => {
    const cartItem: CartItem = {
      id: activity.id,
      type: "activity",
      name: activity.name,
      image: activity.image,
      price: activity.price,
      quantity: 1,
    };
    addToCart(cartItem);
  };

  const confirmBooking = () => {
    const ticketNumber = `CPG-${Date.now().toString(36).toUpperCase()}`;
    const confirmation: BookingConfirmation = {
      ticketNumber,
      items: state.cart,
      guestInfo: state.guestInfo,
      totalPrice: getTotalPrice(),
      bookingDate: new Date().toISOString(),
    };
    setState((prev) => ({ ...prev, confirmation, step: 6 }));
  };

  const resetBooking = () => {
    setState(initialState);
  };

  return (
    <BookingContext.Provider
      value={{
        ...state,
        setStep,
        selectAccommodation,
        setSelectedDate,
        setSelectedTimeSlot,
        setNights,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        setGuestInfo,
        setPaymentMethod,
        getTotalPrice,
        confirmBooking,
        resetBooking,
        addActivityToCart,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
