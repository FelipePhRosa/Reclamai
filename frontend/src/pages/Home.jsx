import Layout from '../components/Layout';
import MapaDenuncia from '../components/MapaLeaflet';
import ReportCard from '../components/ReportCardHome';
import { Link } from 'react-router-dom';
import {
  TriangleAlert,
  ChartColumn,
  Clock,
  CircleCheckBig,
  TrendingUp,
  Plus
} from 'lucide-react';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


function Home() {
  const { user } = useContext(AuthContext);

  return (
    <Layout>
      <MapaDenuncia />
    </Layout>
  );
}

export default Home;
