import Sidebar from "../componentes/Sidebar";
import Navbar from "../componentes/Navbar";
import MapaDenuncia from "../componentes/MapaLeaflet";
import AlertaRodape from "../componentes/Rodape";
import 'leaflet/dist/leaflet.css';

function MapaProblemas() {
  return (
    <div className="flex h-screen">
      {/* Sidebar à esquerda */}
      <Sidebar />

      {/* Conteúdo principal: Navbar em cima, Mapa embaixo */}
      <div className="flex flex-col flex-1 h-screen">
        {/* Navbar no topo */}
        <Navbar />

        {/* Mapa preenchendo o restante da tela */}
        <div className="flex-1 ">
          <MapaDenuncia />
          <div className="flex items-center justify-center">
             <AlertaRodape/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapaProblemas;
