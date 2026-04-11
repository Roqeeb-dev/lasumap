export const categoryConfig: Record<
  string,
  { color: string; bg: string; label: string }
> = {
  faculty: { color: "text-blue-700", bg: "bg-blue-100", label: "Faculty" },
  facility: {
    color: "text-emerald-700",
    bg: "bg-emerald-100",
    label: "Facility",
  },
  landmark: { color: "text-amber-700", bg: "bg-amber-100", label: "Landmark" },
  department: {
    color: "text-purple-700",
    bg: "bg-purple-100",
    label: "Department",
  },
  restaurant: {
    color: "text-rose-700",
    bg: "bg-rose-100",
    label: "Restaurant",
  },
  school: { color: "text-sky-700", bg: "bg-sky-100", label: "School" },
};

export const allCategories = ["all", ...Object.keys(categoryConfig)];
