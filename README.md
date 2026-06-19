# LASU Navigate

> Interactive pedestrian navigation system for Lagos State University's Ojo campus.

**Live Demo:** [lasunav-sable.vercel.app](https://lasunav-sable.vercel.app)

LASU Navigate is a web-based campus navigation app that helps students, staff, and visitors find their way around LASU. Unlike generic mapping tools that route along main vehicular roads, LASU Navigate is built on a custom pedestrian path network — covering walkways, junctions, and shortcuts — so routes reflect how students actually walk across campus.

---

## ✨ Features

- **Interactive Campus Map** — Built on Mapbox GL JS, covering 50+ locations across LASU's Ojo campus
- **Search & Discovery** — Instantly search buildings, faculties, departments, and facilities by name
- **Category Filtering** — Browse locations by type: Faculty, Facility, Landmark, Department, Restaurant, School
- **Get My Location** — One-tap geolocation to center the map on your current position
- **Turn-by-Turn Directions** — Select an origin and destination to get a complete walking route with step-by-step instructions, ETA, and distance
- **Pedestrian-Optimized Routing** — Routes are calculated over a manually mapped graph of campus walkways and shortcuts using Dijkstra's algorithm, rather than defaulting to vehicular roads
- **Responsive Building Info** — Tap any marker to view details about that location

---

## 🛠 Tech Stack

| Layer       | Technology                                                            |
| ----------- | --------------------------------------------------------------------- |
| Framework   | Next.js 15 (App Router)                                               |
| Language    | TypeScript                                                            |
| Styling     | Tailwind CSS v4                                                       |
| Mapping     | Mapbox GL JS via `react-map-gl` v8                                    |
| Pathfinding | Custom Dijkstra implementation over a manually mapped node/edge graph |
| Icons       | Lucide React                                                          |
| Deployment  | Vercel                                                                |

---

## 📁 Project Structure

```
lasu-navigate/
├── app/
│   └── map/                      # Map page (App Router)
├── components/
│   ├── DirectionsPanel.tsx       # Directions orchestrator
│   ├── directions/                # Directions subcomponents
│   │   ├── PanelHeader.tsx
│   │   ├── DirectionsForm.tsx
│   │   ├── RouteHeaderCompact.tsx
│   │   ├── RouteSummaryCard.tsx
│   │   ├── EmptyState.tsx
│   │   └── StepsList.tsx
│   ├── SearchBar.tsx
│   ├── CategoryFilter.tsx
│   ├── BuildingPopup.tsx
│   ├── LocateButton.tsx
│   └── MapComponent.tsx
├── data/
│   ├── buildings.json            # Campus location data (GeoJSON-style features)
│   ├── nodes.json                # Pedestrian path nodes (junctions, entrances, shortcuts)
│   └── edges.json                # Pedestrian path connections between nodes
├── lib/
│   └── directions.ts             # Routing logic, Dijkstra, formatting helpers
├── types/
│   └── buildings.ts              # Shared TypeScript types
└── public/
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- npm, yarn, or pnpm
- A free [Mapbox](https://www.mapbox.com/) account and access token

### Installation

```bash
# Clone the repository
git clone https://github.com/Roqeeb-dev/lasumap.git
cd lasumap

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_access_token_here
```

Get a free token from your [Mapbox account dashboard](https://account.mapbox.com/access-tokens/).

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🗺 How the Routing Works

LASU Navigate doesn't rely solely on third-party road routing inside campus. Instead, it uses a custom-built graph:

1. **Nodes** represent decision points — junctions, building entrances, and the start/end of shortcuts — each with a latitude and longitude.
2. **Edges** represent walkable connections between two nodes, including informal paths and shortcuts that wouldn't appear on a standard road map.
3. **Distance** between connected nodes is calculated using the Haversine formula.
4. **Dijkstra's algorithm** runs over this graph to find the shortest walkable path between any two points.
5. When a user selects an origin and destination, their nearest graph nodes are found, the shortest path is computed, and the result is converted into a polyline drawn on the map along with step-by-step instructions.

This approach means routes follow real student walking patterns — including shortcuts — rather than defaulting to paved vehicular roads.

---

## 🧭 Roadmap

- [ ] Expand pedestrian graph coverage across all campus zones
- [ ] Live, real-time navigation with continuous rerouting as the user moves
- [ ] Turn-by-turn voice/visual instruction banner during active navigation
- [ ] Outdoor-to-campus routing handoff (Mapbox routing outside campus, custom graph inside)
- [ ] Offline map support

---

## 🤝 Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Roqeeb**
Final-Year Computer Science Student, Lagos State University
Built as a Final Year Project — LASU Navigate

---

## 🙏 Acknowledgements

- [Mapbox](https://www.mapbox.com/) for mapping and geocoding infrastructure
- [Lucide](https://lucide.dev/) for the icon set
- Lagos State University, Ojo Campus
