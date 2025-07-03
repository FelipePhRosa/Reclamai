import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import Chat from "./paginas/Chat";
import Mapa from "./paginas/MapaProblemas";
import Report from "./componentes/Reportados2";
import ReportarProblemas from "./paginas/ReportarProblemas";
import ChatBot from "./paginas/chatBot";
import Login from "./componentes/Login";
import Registro from "./componentes/Registro";
import PendingReports from "./componentes/PendingReports"
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pendingreports" element={<PendingReports />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/Report" element={<Report />} />
          <Route path="/reportar" element={<ReportarProblemas />} />
          <Route path="/ChatBot" element={<ChatBot />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
