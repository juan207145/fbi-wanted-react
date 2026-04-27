import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Favoritos() {
  const [favoritos, setFavoritos] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favoritos") || "[]");
    setFavoritos(stored);
  }, []);

  const eliminar = (uid:string) => {
    const nuevos = favoritos.filter(item => item.uid !== uid)
    setFavoritos(nuevos)
    localStorage.setItem("favoritos", JSON.stringify(nuevos))
  }

  return (
    <div>
      <h1>Favoritos</h1>

      {favoritos.length === 0 ? (
        <p>No tienes favoritos</p>
      ) : (
        <div className="contenedor">
          {favoritos.map((item) => (
            <div key={item.uid} className="card">
              <img src={item.images?.[0]?.original} />
              <h3>{item.title}</h3>

              <Link to={`/detalle/${item.uid}`} state={item}>
                Ver más
              </Link>

              <button onClick={() => eliminar(item.uid)}>
                ❌ Quitar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoritos;