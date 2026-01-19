import InteractiveMap from "../components/InteractiveMap";

export default function MapPage() {
  return (
    <div className="min-h-screen bg-zooGreen/80 px-4 py-12">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-zooGreen mb-2">Zoo Map</h1>
        <p className="text-gray-600 mb-6">
        Find your way to Reptile Zoo easily using the interactive map below.
        </p>

      <InteractiveMap />
    </div>
    </div>
  );
}
