import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { categoryIcons } from '../icons/CategoryIcons';

export default function MiniMap({ lat, lng, category_id, darkMode }) {
  if (!lat || !lng) return null;

  const icon = categoryIcons[category_id] || categoryIcons.default;

  return (
    <div className="w-full h-48 rounded-xl overflow-hidden border border-gray-700">
      <MapContainer
        center={[parseFloat(lat), parseFloat(lng)]}
        zoom={16}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer
          url={
            darkMode
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        />
        <Marker position={[parseFloat(lat), parseFloat(lng)]} icon={icon} />
      </MapContainer>
    </div>
  );
}
