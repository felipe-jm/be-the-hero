import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import { toast } from "react-toastify";

import { useForm } from "react-hook-form";

import api from "../../services/api";

import "./styles.css";

import logoImage from "../../assets/logo.svg";

export default function Register() {
  const { register, handleSubmit } = useForm();

  const history = useHistory();

  async function onSubmit(data) {
    try {
      const response = await api.post("ongs", data);

      history.push("/");

      toast.success(`Sucesso! Esse é seu ID de acesso: ${response.data.id}`);
    } catch (err) {
      toast.error(
        "Algo de errado ao tentar seu registro D: Por favor, tente novamente"
      );
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImage} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajuda pessoas a encontrarem
            os casos da sua ONG.
          </p>
          <Link className="back-link" to="/register">
            <FiArrowLeft size={16} color="#E02041" />
            Já tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="name" placeholder="Nome da ONG" ref={register} />
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            ref={register}
          />
          <input name="whatsapp" placeholder="Whatsapp" ref={register} />

          <div className="input-group">
            <input name="city" placeholder="Cidade" ref={register} />
            <input
              name="uf"
              placeholder="UF"
              style={{ width: "80px" }}
              ref={register}
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
