import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Original() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.fbi.gov/@wanted?page=1")
      .then((res) => res.json())
      .then((res) => setData(res.items.slice(0, 10)));
  }, []);

  const agregarFavorito = (item: any) => {
    let favs = JSON.parse(localStorage.getItem("favoritos") || "[]");

    const existe = favs.find((f: any) => f.uid === item.uid);
    if (!existe) {
      favs.push(item);
      localStorage.setItem("favoritos", JSON.stringify(favs));
    }
  };

  return (
    <div>
      <h2>Top 10 más buscados</h2>

      <div className="contenedor">
        {data.map((item) => (
          <div key={item.uid} className="card">
            <img
              src={item.images?.[0]?.original || "https://via.placeholder.com/150"}
            />

            <h3>{item.title}</h3>

            
            <Link to={`/detalle/${item.uid}`} state={item}>
              Ver más
            </Link>

            <button onClick={() => agregarFavorito(item)}>
              ⭐ Favorito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Original;