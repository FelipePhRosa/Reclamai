import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "./Layout";

export default function Analise() {
  const { token } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/reportPending") // Pega denúncias pendentes (em análise)
      .then((res) => res.json())
      .then((data) => setReports(data.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredReports = reports.filter((report) =>
    report.reportTitle.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Layout>
      <main className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Denúncias em Análise</h1>

        <input
          type="text"
          placeholder="Filtrar por título..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 mb-6 w-full md:w-1/2 rounded"
        />

        {filteredReports.length === 0 && (
          <p className="text-gray-600">Nenhuma denúncia em análise encontrada.</p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredReports.map((report) => (
            <div key={report.id} className="bg-white shadow-md rounded p-4">
              <img
                src={report.image}
                alt={report.reportTitle}
                className="h-48 w-full object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold">{report.reportTitle}</h2>
              <p className="text-sm text-gray-600 mt-1">{report.description}</p>
              <p className="text-sm text-gray-500 mt-2 italic">
                Endereço: {report.address}
              </p>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
