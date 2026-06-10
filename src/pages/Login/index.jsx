import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import * as styles from "./Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const autenticar = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const response = await api.post("/login", {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      
      // Armazena o username digitado sem alterar o fluxo da resposta da API
      localStorage.setItem("username", username);

      navigate("/feed");
    } catch (error) {
      setErro(`${error} usuário ou senha incorretos `);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginBox} onSubmit={autenticar}>
        <h2>Login</h2>
        {erro && <p className={styles.erro}>{erro}</p>}
        <input
          type="text"
          id="username"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}