import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ReportModal from './ReportModal';
import { categoryIcons } from '../icons/CategoryIcons';
import MiniModal from './MiniModal';

// Componente para centralizar o mapa na posição escolhida
function CenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView([center.lat, center.lng], 15);
    }
  }, [center, map]);
  return null;
}

function MapaDenuncia() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('darkMode')) || false
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const [reports, setReports] = useState([]);
  const [center, setCenter] = useState(null);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Pelotas");

  const cities = [
    { name: "Pelotas", lat: -31.765, lng: -52.337 },
    { name: "Camaquã", lat: -30.848781374172674, lng: -51.80721534205658 },
    { name: "Arambaré", lat: -30.910520592030185, lng: -51.50006366984258 },
    { name: "Cristal", lat: -31.00056536172436, lng: -52.047261177199886 },
  ];

  useEffect(() => {
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

  const selectCity = (city) => {
    setSelectedCity(city.name);
    setCenter({ lat: city.lat, lng: city.lng });
    setCityDropdownOpen(false);
  };

  return (
    <div className="h-screen w-full rounded-xl md:h-136 lg:h-screen relative">
      {/* Botões no canto superior direito */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2 items-end">

        {/* Dropdown de cidades */}
        <div className="relative">
          <button
            onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
            className="h-10 w-40 bg-white dark:bg-gray-800 dark:text-white font-semibold shadow-lg rounded-lg p-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
          >
            {selectedCity}
          </button>

          {cityDropdownOpen && (
            <div className="absolute right-0 mt-1 w-26 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg rounded-lg overflow-hidden z-50">
              {cities
                .filter(c => c.name !== selectedCity)
                .map((city) => (
                  <button
                    key={city.name}
                    onClick={() => selectCity(city)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-semibold dark:text-white"
                  >
                    {city.name}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>

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
        />

        {reports.map((report, idx) => {
          const lat = parseFloat(report.latitude);
          const lng = parseFloat(report.longitude);

          if (isNaN(lat) || isNaN(lng)) return null;

          const icon = categoryIcons[report.category_id] || categoryIcons.default;

          return (
            <Marker key={idx} position={[lat, lng]} icon={icon}>
              <Popup closeButton={false} className="bg-transparent shadow-none p-0">
                <MiniModal report={report} id={report.id} />
              </Popup>
            </Marker>
          );
        })}

        <MapClickHandler onMapClick={handleMapClick} />
        <CenterMap center={center} />
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
