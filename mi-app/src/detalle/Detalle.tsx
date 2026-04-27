import { useLocation } from "react-router-dom";
import { useState } from "react";

function Detalle() {
  const location = useLocation();
  const item = location.state;

  const [update, setUpdate] = useState(false);

  if (!item) return <p>No hay datos</p>;

  const esFavorito = () => {
    const fav = JSON.parse(localStorage.getItem("favoritos") || "[]")
    return fav.some((f:any) => f.uid === item.uid)
  }

  const toggleFavorito = () => {
    let fav = JSON.parse(localStorage.getItem("favoritos") || "[]")

    const existe = fav.find((f:any) => f.uid === item.uid)

    if (existe) {
      fav = fav.filter((f:any) => f.uid !== item.uid)
    } else {
      fav.push(item)
    }

    localStorage.setItem("favoritos", JSON.stringify(fav))
    setUpdate(!update)
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{item.title}</h1>

      <img
        src={item.images?.[0]?.original}
        width="300"
      />

      <p><strong>Estado:</strong> {item.status}</p>

      <p><strong>Recompensa:</strong> {item.reward || "No disponible"}</p>

      <p>{item.description || "Sin descripción"}</p>

      <button onClick={toggleFavorito}>
        {esFavorito() ? "❤️ Quitar de favoritos" : "🤍 Agregar a favoritos"}
      </button>

      <br /><br />

      <button onClick={() => window.history.back()}>
        ⬅ Volver
      </button>
    </div>
  );
}

export default Detalle;