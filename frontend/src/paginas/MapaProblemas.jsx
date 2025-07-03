import Layout from "../componentes/Layout";
import MapaDenuncia from "../componentes/MapaLeaflet";
import AlertaRodape from "../componentes/Rodape";
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
