import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import L from 'leaflet';
import 'leaflet.awesome-markers';
import ReportModal from './ReportModal';

function MapaDenuncia() {
  const [modalOpen, setModalOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch('http://localhost:3000/reportList');
        const data = await res.json();
        console.log('Reports recebidos:', data);
        setReports(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error('Erro ao buscar reports:', error);
      }
    };

    fetchReports();
  }, []);

  // criar ícones AwesomeMarkers baseados na categoria
  const categoryIcons = {
    1: L.AwesomeMarkers.icon({ icon: 'exclamation-triangle', markerColor: 'orange', prefix: 'fa' }), // Deslizamentos
    2: L.AwesomeMarkers.icon({ icon: 'tint', markerColor: 'blue', prefix: 'fa' }), // Alagamentos
    3: L.AwesomeMarkers.icon({ icon: 'gun', markerColor: 'red', prefix: 'fa' }), // Assalto
    4: L.AwesomeMarkers.icon({ icon: 'fire', markerColor: 'red', prefix: 'fa' }), // Incêndio
    5: L.AwesomeMarkers.icon({ icon: 'lightbulb', markerColor: 'yellow', prefix: 'fa' }), // Iluminação
    6: L.AwesomeMarkers.icon({ icon: 'road', markerColor: 'gray', prefix: 'fa' }), // Buracos
    7: L.AwesomeMarkers.icon({ icon: 'building', markerColor: 'darkred', prefix: 'fa' }), // Desabamentos
    8: L.AwesomeMarkers.icon({ icon: 'question', markerColor: 'green', prefix: 'fa' }), // Outros
    default: L.AwesomeMarkers.icon({ icon: 'map-marker', markerColor: 'cadetblue', prefix: 'fa' })
  };

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
    <div className="h-screen w-full rounded-xl md:h-136 lg:h-screen">
      <MapContainer
        center={[-31.769, -52.341]}
        zoom={15}
        className="h-full w-full rounded-xl"
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {reports.map((report, idx) => {
          const lat = parseFloat(report.latitude);
          const lng = parseFloat(report.longitude);

          if (isNaN(lat) || isNaN(lng)) return null;

          const icon = categoryIcons[report.category_id] || categoryIcons.default;

          return (
            <Marker key={idx} position={[lat, lng]} icon={icon}>
              <Popup>{report.description}</Popup>
            </Marker>
          );
        })}

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
