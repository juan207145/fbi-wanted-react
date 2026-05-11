import { useState } from "react";
import { supabase } from "./supabase";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const iniciarSesion = async () => {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Bienvenido");
      navigate("/");
    }
  };

  return (
    <div className="auth">

      <h1>Login</h1>

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

      <button onClick={iniciarSesion}>
        Ingresar
      </button>

      <p>
        ¿No tienes cuenta?
        <Link to="/registro"> Registrarse</Link>
      </p>

    </div>
  );
}

export default Login;