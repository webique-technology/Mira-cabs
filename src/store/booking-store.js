"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  search: null,
  selectedVehicle: null,
  passenger: null,
  paymentMethod: null,
  appliedOffer: null,
};

export const useBookingStore = create()(
  persist(
    (set) => ({
      ...initialState,
      _hasHydrated: false,
      setHasHydrated: (hydrated) => set({ _hasHydrated: hydrated }),

      setSearch: (search) =>
        set({ search, selectedVehicle: null, appliedOffer: null }),

      updateTripType: (tripType) =>
        set((state) =>
          state.search ? { search: { ...state.search, tripType } } : state,
        ),

      selectVehicle: (vehicle) => set({ selectedVehicle: vehicle }),

      setFleetBooking: (vehicle, searchData) =>
        set({
          selectedVehicle: vehicle,
          search: {
            ...searchData,
            packageDetails: null,
          },
          appliedOffer: null,
        }),

      selectFleetVehicle: (vehicle, defaultSearch = {}) =>
        set((state) => {
          const today = new Date().toISOString().split("T")[0];
          const isStalePackage = state.search?.tripType === "tour-package";

          const cleanSearch = {
            tripType: isStalePackage
              ? "one-way"
              : state.search?.tripType || "one-way",
            pickup: isStalePackage
              ? "Nashik"
              : state.search?.pickup || "Nashik",
            destination: isStalePackage
              ? "Mumbai"
              : state.search?.destination || "Mumbai",
            pickupDate: state.search?.pickupDate || today,
            pickupTime: state.search?.pickupTime || "09:00",
            passengers: Math.min(4, vehicle?.seats || 4),
            ...defaultSearch,
            packageDetails: null,
          };

          return {
            selectedVehicle: vehicle,
            search: cleanSearch,
            appliedOffer: null,
          };
        }),

      clearTourPackage: () =>
        set((state) => ({
          search: state.search
            ? {
                ...state.search,
                tripType:
                  state.search.tripType === "tour-package"
                    ? "one-way"
                    : state.search.tripType,
                packageDetails: null,
              }
            : null,
        })),

      setPassenger: (passenger) => set({ passenger }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      applyOffer: (offer) => set({ appliedOffer: offer }),

      resetCheckout: () =>
        set({ passenger: null, paymentMethod: null, appliedOffer: null }),

      resetAll: () => set(initialState),
    }),
    {
      name: "Mira.booking-draft",
      // Optional: Store only what is necessary across reloads
      partialize: (state) => ({
        search: state.search,
        selectedVehicle: state.selectedVehicle,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
