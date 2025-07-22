import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Mapa from "./pages/MapaProblemas";
import Report from "./components/Reportados2";
import ReportarProblemas from "./pages/ReportarProblemas";
import ChatBot from "./pages/ChatBot";
import Login from "./components/Login";
import Registro from "./components/Registro";
import Ajuda from "./pages/Ajuda";
import Analise from "./components/Analise";
import PendingReports from "./components/PendingReports"
import { AuthProvider } from './context/AuthProvider';
import Layout from "./components/Layout";
import UserList from "./components/Userlist";
import EditarPerfil from "./components/EditarPerfil";
import Config from "./components/Config";


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
          <Route path="/Userlist" element={<UserList/>} />
           <Route path="/Analise" element={<Analise />} />
          <Route path="/Ajuda" element={<Ajuda/>}/>
          <Route path="/ChatBot" element={<Layout><ChatBot /></Layout>} />
          <Route path="/EditarPerfil" element={<EditarPerfil/>}/>
          <Route path="/Config" element={<Config/>}/>
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;