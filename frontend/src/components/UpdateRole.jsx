export default function ModalUpdate({ onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/10"
        onClick={onClose}
      ></div>

      <div className="relative z-10 bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg max-w-sm w-full">
        {children}
        <button
          onClick={onClose}
          className="mt-8 px-4 py-2 bg-blue-600 hover:bg-blue-700 duration-200 shadow-md shadow-blue-500/60 text-white rounded-md cursor-pointer font-semibold font-[Inter] "
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
