import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapaDenuncia() {
    return (
        <div className='flex items-center justify-center border'>
                <MapContainer center={[-31.769, -52.341]} zoom={15} className="h-[88.5vh] w-full ">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Marcadores aqui (virão do backend depois) */}
            <Marker position={[-31.769, -52.341]}>
                <Popup>Problema reportado aqui.</Popup>
            </Marker>
        </MapContainer>
        </div>
      
    );
}

export default MapaDenuncia