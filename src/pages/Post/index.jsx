import * as styles from "./Post.module.css";
import Header from "../../components/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const validationPost = yup.object().shape({
  titulo: yup
    .string()
    .required("Preencha Título")
    .max(40, "Título tamanho excedido"),
  descricao: yup
    .string()
    .required("Preencha a descrição")
    .max(50, "Descrição tamanho excedido"),
  conteudo: yup
    .string()
    .required("Preencha o conteúdo")
    .max(100, "Contéudo excedido"),
});

export default function Post() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationPost) });

  const addPost = (data) => {
    axios
      .post("http://localhost:8080/posts", data)
      .then(() => {
        console.log("Dados enviados");
        navigate("/");
      })
      .catch(() => console.log("Erro na requisição"));
  };

  return (
    <div className={styles.mainContainer}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.cardPost}>
          <h2>Criar Postagem</h2>

          <div className={styles.cardBodyPost}>
            <form onSubmit={handleSubmit(addPost)}>
              
              <div className={styles.fields}>
                <label htmlFor="titulo">Título</label>
                <input
                  type="text"
                  id="titulo"
                  {...register("titulo")}
                />
                <p className={styles.errorMessage}>{errors.titulo?.message}</p>
              </div>

              <div className={styles.fields}>
                <label htmlFor="descricao">Descrição</label>
                <input
                  type="text"
                  id="descricao"
                  {...register("descricao")}
                />
                <p className={styles.errorMessage}>{errors.descricao?.message}</p>
              </div>

              <div className={styles.fields}>
                <label htmlFor="conteudo">Conteúdo</label>
                <textarea
                  id="conteudo"
                  {...register("conteudo")}
                />
                <p className={styles.errorMessage}>{errors.conteudo?.message}</p>
              </div>

              <div className={styles.btnPost}>
                <button type="submit">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}