import React from "react";

import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import logoImage from "../../assets/logo.svg";

export default function NewIncident() {
  const { register, handleSubmit } = useForm();

  const history = useHistory();

  const ongId = localStorage.getItem("ongId");

  async function onSubmit(data) {
    try {
      await api.post("incidents", data, {
        headers: {
          Authorization: ongId,
        },
      });

      history.push("/profile");
    } catch (err) {
      toast.error("Erro ao tentar cadastrar caso. Tente novamente");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImage} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="title" placeholder="Título do caso" ref={register} />

          <textarea name="description" placeholder="Descrição" ref={register} />

          <input name="value" placeholder="Valor em reais" ref={register} />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
