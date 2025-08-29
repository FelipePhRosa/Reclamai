import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ReportModal from './ReportModal';
import { categoryIcons } from '../icons/CategoryIcons';

function MapaDenuncia() {
    const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('darkMode')) || false
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const [reports, setReports] = useState([]);

    useEffect(() => {
    // Atualiza sempre que o localStorage mudar
    const interval = setInterval(() => {
      const saved = JSON.parse(localStorage.getItem('darkMode'));
      setDarkMode(saved);
    }, 500);

    return () => clearInterval(interval);
  }, []);

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
        className="h-full w-full rounded-2xl"
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          url={
            darkMode
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
          className='transition-all duration-75'
      />

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
