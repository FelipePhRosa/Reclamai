import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "./Layout";

export default function PendingReports() {
  const { token } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/reportPending")
      .then((res) => res.json())
      .then((data) => setReports(data.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAction = async (id, action) => {
    const url = `http://localhost:3000/${action}Report/${id}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message || errorData.error || "Erro na ação.");
        return;
      }

      // Remove do estado local após ação
      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Erro ao realizar ação:", err);
    }
  };

  const filteredReports = reports.filter((report) =>
    report.reportTitle.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Layout>
      <main className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Denúncias Pendentes</h1>

        <input
          type="text"
          placeholder="Filtrar por título..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 mb-6 w-full md:w-1/2 rounded dark:placeholder-gray-400 dark:border-gray-400"
        />

        {filteredReports.length === 0 && (
          <p className="text-gray-600 dark:text-gray-200">Nenhuma denúncia pendente encontrada.</p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
          {filteredReports.map((report) => (
            <div key={report.id} className="bg-white shadow-md rounded p-4 dark:bg-gray-800">
              <img
                src={report.image ? `http://localhost:3000/uploads/${report.image}` : '/placeholder.png'}
                alt={report.reportTitle}
                className="h-48 w-full object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold dark:text-white">{report.reportTitle}</h2>
              <p className="text-sm text-gray-600 mt-1 break-words dark:text-white">{report.description}</p>
              <p className="text-sm text-gray-500 mt-2 italic dark:text-white">
                Endereço: {report.address}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  className="bg-green-600 font-semibold text-white px-3 py-1 rounded hover:bg-green-700"
                  onClick={() => handleAction(report.id, "approve")}
                >
                  Aprovar
                </button>
                <button
                  className="bg-red-600 text-white font-semibold px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => handleAction(report.id, "decline")}
                >
                  Rejeitar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
