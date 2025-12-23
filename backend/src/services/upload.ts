import multer from "multer";

// Configura onde e como salvar os arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // pasta onde salvará
  },
  filename: (req, file, cb) => {
    // Garante um nome único
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Exporta o middleware configurado
const upload = multer({ storage });
export default upload;
