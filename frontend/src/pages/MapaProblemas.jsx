import Layout from "../components/Layout";
import MapaDenuncia from "../components/MapaLeaflet";
import AlertaRodape from "../components/Rodape";
import 'leaflet/dist/leaflet.css';

function MapaProblemas() {
  return (
    <Layout>
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <MapaDenuncia />
        </div>
        <div className="flex items-center justify-center mt-4">
          <AlertaRodape />
        </div>
      </div>
    </Layout>
  );
}

export default MapaProblemas;
