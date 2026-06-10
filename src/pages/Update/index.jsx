import * as styles from "./Update.module.css";
import Header from "../../components/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

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
    .max(100, "Conteúdo excedido"),
});

export default function Update() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(validationPost) });

  useEffect(() => {
    api.get(`/posts/${id}`).then((response) => {
      reset(response.data);
    });
  }, [id, reset]);

  const addPost = (data) => {
    api
      .put(`/posts/${id}`, data)
      .then(() => {
        console.log("Dados enviados");
        navigate("/feed");
      })
      .catch(() => console.log("Erro na requisição"));
  };

  return (
    <div className={styles.mainContainer}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.cardPost}>
          <h1>Editar Postagem</h1>

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
                <button type="submit">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}