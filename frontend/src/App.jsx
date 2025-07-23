import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Mapa from "./pages/MapaProblemas";
import Report from "./components/Reportados2";
import ReportarProblemas from "./pages/ReportarProblemas";
import ChatBot from "./pages/ChatBot";
import Login from "./components/Login";
import Registro from "./components/Registro";
import PendingReports from "./components/PendingReports"
import { AuthProvider } from './context/AuthProvider';
import Layout from "./components/Layout";
import UserList from "./components/Userslist";
import Ajuda from "./pages/Ajuda";
import Analise from "./components/Analise"
import Config from "./components/Config"
import EditarPerfil from "./components/EditarPerfil"

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
          <Route path="/ChatBot" element={<Layout><ChatBot /></Layout>} />
          <Route path="/userList" element={<UserList/>}/>
          <Route path="/Analise" element={<Analise/>}/>
          <Route path="/help" element={<Ajuda/>}/>
          <Route path="/settings" element={<Config/>}/>
          <Route path="/EditarPerfil" element={<EditarPerfil/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;