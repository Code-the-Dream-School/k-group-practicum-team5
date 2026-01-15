import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const ZOO_LOCATION: [number, number] = [47.8554, -121.9706]; // Example: Monroe, WA

function Routing({ destination }: { destination: [number, number] | null }) {
  const map = useMap();

  useEffect(() => {
    if (!destination) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(ZOO_LOCATION[0], ZOO_LOCATION[1]),
        L.latLng(destination[0], destination[1]),
      ],
      routeWhileDragging: true,
      show: true,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [destination, map]);

  return null;
}

export default function InteractiveMap() {
  const [address, setAddress] = useState("");
  const [destination, setDestination] = useState<[number, number] | null>(null);

  const geocodeAddress = async () => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
    );
    const data = await res.json();

    if (data.length > 0) {
      setDestination([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
    } else {
      alert("Address not found");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={geocodeAddress}
          className="bg-zoo-green text-white px-4 py-2 rounded"
        >
          Get Directions
        </button>
      </div>

      <MapContainer
        center={ZOO_LOCATION}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
        className="rounded-xl shadow-md"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={ZOO_LOCATION}>
          <Popup>Reptile Zoo</Popup>
        </Marker>

        {destination && <Routing destination={destination} />}
      </MapContainer>
    </div>
  );
}
