import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Header from "../../components/Header";
import * as styles from "./Feed.module.css";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os posts da API
  const readPosts = () => {
    api.get("/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Erro ao carregar posts:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    readPosts();
  }, []);

  // FUNÇÃO PARA DELETAR O POST
  const deletePost = (id) => {
    api.delete(`/posts/${id}`)
      .then(() => {
        // Atualiza a lista removendo o post deletado localmente
        setPosts(posts.filter(post => post.id !== id));
        console.log("Post deletado com sucesso");
      })
      .catch((error) => console.log("Erro ao deletar post:", error));
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  return (
    <div className={styles.feedContainer}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.cards}>
          {posts.length === 0 ? (
            <p className={styles.noPosts}>Nenhuma publicação encontrada.</p>
          ) : (
            posts.map((post) => (
              <article key={post.id} className={styles.card}>
                <header className={styles.cardHeader}>
                  <h2>{post.titulo}</h2>
                </header>
                
                <p className={styles.cardDescription}>{post.descricao}</p>
                
                <div className={styles.btns}>
                  <div className={styles.btnEdit}>
                    <Link to={`/update/${post.id}`}>
                      <button>Editar</button>
                    </Link>
                  </div>

                  <div className={styles.btnReadMore}>
                    <Link to={`/more/${post.id}`}>
                      <button>Ler Mais</button>
                    </Link>
                  </div>

                  {/* BOTÃO DE DELETAR RESTAURADO */}
                  <div className={styles.btnDelete}>
                    <button onClick={() => deletePost(post.id)}>
                      Deletar
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}