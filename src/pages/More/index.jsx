import * as styles from "./More.module.css";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function More() {
  const [more, setMore] = useState({});
  const { id } = useParams();

  useEffect(() => {
    api.get(`/posts/${id}`).then((response) => {
      setMore(response.data);
    });
  }, []);

  return (
    <div>
      <Header />
      <main>
        <div className={styles.cards}>
          <div className={styles.card}>
            <header>
              <h2>{more.titulo}</h2>
            </header>
            <div className={styles.line} />
            <p>{more.conteudo}</p>
          </div>
        </div>
      </main>
    </div>
  );
}