import { Link } from "react-router-dom";

export default function MiniModal({ report, id }) {
  return (
    <div className="w-64 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
      {report.image && (
        <img
          src={report.image}
          alt="Denúncia"
          className="w-full h-32 object-cover rounded-lg mb-3 border border-gray-200 dark:border-gray-700"
        />
      )}
      <h2 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
        {report.reportTitle || "Sem título"}
      </h2>
      <h2 className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 mt-2">
        {report.description || "Sem descrição disponível."}
      </h2>
      <Link to={`/report/${id}`}>
        <button className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg font-medium text-sm transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer">
          Analisar
        </button>
      </Link>
    </div>
  );
}
