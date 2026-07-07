import { create } from "zustand";
import type { Feature } from "@/types/buildings";
import type { RouteResult } from "@/lib/directions";

type GpsStatus = "active" | "weak" | "off";

interface MapStore {
  selectedBuilding: Feature | null;
  activeCategory: string;
  gpsStatus: GpsStatus;
  userPosition: [number, number] | null;
  route: RouteResult | null;
  navigating: boolean;

  setSelectedBuilding: (b: Feature | null) => void;
  setActiveCategory: (c: string) => void;
  setGpsStatus: (s: GpsStatus) => void;
  setUserPosition: (p: [number, number] | null) => void;
  setRoute: (r: RouteResult | null) => void;
  setNavigating: (v: boolean) => void;

  locateFn: (() => void) | null;
  startNavigationFn: ((dest: Feature) => void) | null;
  setLocateFn: (fn: () => void) => void;
  setStartNavigationFn: (fn: (dest: Feature) => void) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  selectedBuilding: null,
  activeCategory: "all",
  gpsStatus: "off",
  userPosition: null,
  route: null,
  navigating: false,

  setSelectedBuilding: (b) => set({ selectedBuilding: b }),
  setActiveCategory: (c) => set({ activeCategory: c }),
  setGpsStatus: (s) => set({ gpsStatus: s }),
  setUserPosition: (p) => set({ userPosition: p }),
  setRoute: (r) => set({ route: r }),
  setNavigating: (v) => set({ navigating: v }),

  locateFn: null,
  startNavigationFn: null,
  setLocateFn: (fn) => set({ locateFn: fn }),
  setStartNavigationFn: (fn) => set({ startNavigationFn: fn }),
}));
