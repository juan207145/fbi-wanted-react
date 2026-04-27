import { useEffect, useState } from "react";
import "./style.css";

function Informativa() {
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    fetch("https://api.fbi.gov/@wanted?page=1")
      .then(res => res.json())
      .then(res => setItem(res.items[0]));
  }, []);

  return (
    <div className="info-bg">
      <div className="info-card">
        <h1>FBI API</h1>
        <p className="autor">por Juan Pablo</p>

        {item && (
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNkjUg2PgzDmn20Tw2_NGuQtF_SOdiqEMLAg&s"
            className="info-img"
          />
        )}

        <div className="info-box">
          API con información de los más buscados del FBI 🚨
        </div>

        <a
          href="https://api.fbi.gov/@wanted"
          target="_blank"
        >
          Ver API
        </a>

        <p className="version">v1.0.0</p>
      </div>
    </div>
  );
}

export default Informativa;