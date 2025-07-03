import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapaDenuncia() {
  return (
    <div className="h-[400px] w-full border-2 border-gray-300 rounded-md overflow-hidden">
      <MapContainer
        center={[-31.769, -52.341]}
        zoom={15}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[-31.769, -52.341]}>
          <Popup>Problema reportado aqui.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapaDenuncia;
