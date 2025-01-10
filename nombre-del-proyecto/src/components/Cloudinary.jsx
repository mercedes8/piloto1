import { useState, useEffect } from "react";
import axios from "axios";
import "./Cloudinary.css"; // Importa el archivo CSS

function Cloudinary() {
  const [imagenes, setImagenes] = useState([]); // Almacena imágenes locales
  const [imagenesSubidas, setImagenesSubidas] = useState([]); // Almacena imágenes subidas

  // Obtener imágenes subidas desde Cloudinary al cargar el componente
  useEffect(() => {
    const cargarImagenesSubidas = async () => {
      const response = await axios.get("https://api.cloudinary.com/v1_1/dhmj0jngh/resources/image", {
        params: {
          upload_preset: "Presents_react",
        },
      });
      setImagenesSubidas(response.data.resources);
    };
    cargarImagenesSubidas();
  }, []);

  const chageUploadImage = (e) => {
    const files = Array.from(e.target.files);
    const imagenesPrevias = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      uploadedUrl: null,
    }));
    setImagenes((prev) => [...prev, ...imagenesPrevias]);
  };

  const subirImagen = async (index) => {
    const { file } = imagenes[index];

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Presents_react");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dhmj0jngh/image/upload",
      data
    );

    setImagenes((prev) =>
      prev.map((img, i) =>
        i === index ? { ...img, uploadedUrl: response.data.secure_url } : img
      )
    );
    setImagenesSubidas((prev) => [...prev, response.data]);
  };

  const eliminarImagenSubida = async (public_id) => {
    try {
      const url = `https://api.cloudinary.com/v1_1/[CLOUD_NAME]/image/destroy`;
  
      const data = new FormData();
      data.append("public_id", public_id);
      data.append("api_key", "TU_API_KEY");
      data.append("timestamp", Math.floor(Date.now() / 1000));
      data.append("signature", "TU_SIGNATURE_GENERADA");
  
      await axios.post(url, data);
  
      setImagenesSubidas((prev) =>
        prev.filter((imagen) => imagen.public_id !== public_id)
      );
    } catch (error) {
      console.error("Error al eliminar imagen:", error);
    }
  };
  

  return (
    <div className="cloudinary-container">
      <h1>Seleccionar imágenes para Cloudinary</h1>
      <input type="file" accept="image/*" multiple onChange={chageUploadImage} />

      {/* Imágenes no subidas */}
      <div className="preview-container">
        {imagenes.map((imagen, index) => (
          <div key={index} className="image-preview">
            <img src={imagen.preview} alt={`Preview ${index}`} />
            {!imagen.uploadedUrl ? (
              <button className="upload-button" onClick={() => subirImagen(index)}>
                Subir
              </button>
            ) : (
              <p>Subida correctamente</p>
            )}
          </div>
        ))}
      </div>

      {/* Imágenes ya subidas */}
      <h2>Imágenes subidas</h2>
      <div className="preview-container">
        {imagenesSubidas.map((imagen) => (
          <div key={imagen.public_id} className="image-preview">
            <img src={imagen.secure_url} alt={`Subida ${imagen.public_id}`} />
            <button
              className="delete-button"
              onClick={() => eliminarImagenSubida(imagen.public_id)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cloudinary;
