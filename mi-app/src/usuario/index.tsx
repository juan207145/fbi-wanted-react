import { useState, useEffect } from "react";

function Usuario() {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("nombre");
    if (user) setNombre(user);
  }, []);

  const guardar = () => {
    localStorage.setItem("nombre", nombre);
    alert("Guardado");
  };

  return (
    <div>
      <h1>Usuario</h1>

      <input
        type="text"
        placeholder="Tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <button onClick={guardar}>Guardar</button>
    </div>
  );
}

export default Usuario;