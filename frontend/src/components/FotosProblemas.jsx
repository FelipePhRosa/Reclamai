import { useState } from 'react';
import { Camera } from 'lucide-react';

function Fotos() {
  const [image, setImage] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow rounded-xl">
      <h1 className="font-bold text-xl mb-4">Fotos do Problema</h1>

      <div className="bg-gray-100 flex flex-col justify-center items-center border w-36 h-36 rounded-md cursor-pointer hover:shadow-lg transition duration-200 ease-in-out"
           onClick={() => document.getElementById('file-input').click()} 
           aria-label="Click to add photo">

        {image ? (
          <img src={image} alt="Uploaded preview" className="w-full h-full object-cover rounded-md" />
        ) : (
          <Camera className="text-gray-500" size={24} />
        )}

        <h2 className="font-bold text-sm mt-2">Clique para adicionar</h2>
        <p className="text-xs text-gray-400">ou arraste uma imagem</p>

        <input
          type="file"
          id="file-input"
          className="hidden"
          accept="image/*"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
}

export default Fotos;