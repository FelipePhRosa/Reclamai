import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ReportModal from './ReportModal';

function MapaDenuncia() {
  const [modalOpen, setModalOpen] = useState(false);
  const [coords, setCoords] = useState(null);

  function handleMapClick(lat, lng) {
    setCoords({ lat, lng });
    setModalOpen(true);
  }

  function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
}

  return (
    <div className="h-screen w-full rounded-xl ">
      <MapContainer
        center={[-31.769, -52.341]}
        zoom={15}
        className="h-full w-full rounded-xl"
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[-31.769, -52.341]}>
          <Popup>Problema reportado aqui.</Popup>
        </Marker>

        <MapClickHandler onMapClick={handleMapClick} />
      </MapContainer>

      <ReportModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        lat={coords?.lat ?? null}
        lng={coords?.lng ?? null}
        onSubmit={(desc, lat, lng) => {
          console.log('Enviando:', { desc, lat, lng });
          
        }}
      />
    </div>
  );
}

export default MapaDenuncia;
