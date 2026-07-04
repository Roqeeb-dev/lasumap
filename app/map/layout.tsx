import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <Topbar />

      <div className="flex flex-1 min-h-0">
        <Sidebar />

        <main className="flex-1 min-w-0 relative">{children}</main>
      </div>
    </div>
  );
}
