import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from "./HeaderMain.module.css"; 

export default function HeaderMain() {
  const [usuarioLogado, setUsuarioLogado] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("username");
    if (nomeSalvo) {
      // Remove o @dominio.com se existir
      const nomeLimpo = nomeSalvo.split("@")[0];
      setUsuarioLogado(nomeLimpo);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Remove token, username e limpa a sessão
    navigate("/login"); // Redireciona de volta para a tela de login
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Dashboard</div>
      
      <div className={styles.userSection}>
        {usuarioLogado && (
          <span className={styles.username}>
            {usuarioLogado}
          </span>
        )}
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Sair
        </button>
      </div>
    </header>
  );
}