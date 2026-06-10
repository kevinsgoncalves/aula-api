import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as styles from "./Header.module.css";
import Back from "../../assets/back.svg";

export default function Header() {
  const [usuarioLogado, setUsuarioLogado] = useState("");
  const location = useLocation();

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("username");
    if (nomeSalvo) {
      const nomeLimpo = nomeSalvo.split("@")[0];
      setUsuarioLogado(nomeLimpo);
    }
  }, []);

  // Mostra o botão voltar apenas se você NÃO estiver na página inicial ("/")
  const mostrarBotaoVoltar = location.pathname !== "/";

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        {mostrarBotaoVoltar && (
          <Link to="/" className={styles.backLink}>
            <img src={Back} alt="Voltar" className={styles.backIcon} />
          </Link>
        )}
        <div className={styles.logo}>Dashboard</div>
      </div>
      
      <div className={styles.userSection}>
        <Link to="/post" className={styles.createBtn}>
          Nova Publicação
        </Link>

        {usuarioLogado && (
          <span className={styles.username}>
            {usuarioLogado}
          </span>
        )}
        
        <Link to="/logout" className={styles.logoutLink}>
          Sair
        </Link>
      </div>
    </header>
  );
}