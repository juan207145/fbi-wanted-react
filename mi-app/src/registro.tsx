import { useState } from "react";
import { supabase } from "./supabase";
import { useNavigate } from "react-router-dom";

function Registro() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registrar = async () => {

    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Usuario registrado");
      navigate("/login");
    }
  };

  return (
    <div className="auth">

      <h1>Registro</h1>

      <input
        type="email"
        placeholder="Correo"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={registrar}>
        Registrarse
      </button>

    </div>
  );
}

export default Registro;