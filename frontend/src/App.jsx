import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Mapa from "./pages/MapaProblemas";
import Report from "./components/Reportados2";
import ReportarProblemas from "./pages/ReportarProblemas";
import Login from "./components/Login";
import Registro from "./components/Registro";
import PendingReports from "./components/PendingReports"
import { AuthProvider } from './context/AuthProvider';
import Layout from "./components/Layout";
import UserList from "./components/Userslist";
import Ajuda from "./pages/Ajuda";
import Analise from "./components/Analise"
import ConfigWrapper from './pages/ConfigWrapper'
import EditarPerfil from "./components/EditarPerfil"
import HomeWrapper from "./pages/HomeWrapper";
import AboutPage from "./components/About";
import History from "./components/History";
import Notificacoes from "./components/Notifications";
import Preferencias from "./components/Preferencias";
import ReportPage from "./pages/ReportPage";
import ModalUpdate from "./components/UpdateRole";
import AdmPrefeitura from "./pages/AdmPrefeitura";
import RedefinirSenha from "./components/RedefinirSenha";

function App() {
  return (
    <AuthProvider>
      <Router>
        
        <Routes>
          <Route path="/Prefeitura" element={<AdmPrefeitura/>}/>
          <Route path="/" element={<HomeWrapper />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pendingreports" element={<PendingReports />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/Report" element={<Report />} />
          <Route path="/reportar" element={<ReportarProblemas />} />
          <Route path="/userList" element={<UserList/>}/>
          <Route path="/Analise" element={<Analise/>}/>
          <Route path="/Modal" element={<ModalUpdate/>}/>
          <Route path="/help" element={<Ajuda/>}/>
          <Route path="/settings" element={<ConfigWrapper/>}/>
          <Route path="/EditarPerfil" element={<EditarPerfil/>}/>
          <Route path="/about" element={<Layout><AboutPage/></Layout>}/>
          <Route path="/myreports" element={<Layout><History/></Layout>}/>
          <Route path="/notifications" element={<Notificacoes/>}/>
          <Route path="/preferences" element={<Preferencias/>}/>
          <Route path="/report/:id" element={<ReportPage />} />
          <Route path="/redefinirsenha" element={<RedefinirSenha/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;