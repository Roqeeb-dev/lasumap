"use client";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import { useMapStore } from "@/store/mapStore";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  const {
    selectedBuilding,
    activeCategory,
    gpsStatus,
    locateFn,
    startNavigationFn,
    setActiveCategory,
    setSelectedBuilding,
  } = useMapStore();

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Topbar gpsStatus={gpsStatus} onLocate={() => locateFn?.()} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selectedBuilding={selectedBuilding}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onNavigate={(dest) => startNavigationFn?.(dest)}
          onBuildingSelect={setSelectedBuilding}
        />
        <main className="relative flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
