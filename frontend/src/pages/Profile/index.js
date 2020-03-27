import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { FiPower, FiTrash2, FiArrowDownCircle } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import logoImage from "../../assets/logo.svg";

export default function Profile() {
  const history = useHistory();

  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");

  const [incidents, setIncidents] = useState([]);
  const [page, setPage] = useState(2);
  const [paginate, setPaginate] = useState(false);

  useEffect(() => {
    async function loadIncidents() {
      try {
        const response = await api.get("incidents", {
          headers: { Authorization: ongId },
        });

        setIncidents(response.data);

        if (response.data.length > 4) {
          setPaginate(true);
        }
      } catch (err) {
        toast.error(
          "Erro ao tentar carregar os casos da sua ONG. Tente novamente"
        );
      }
    }

    loadIncidents();
  }, [ongId]);

  async function handleMoreIncidents() {
    setPage(page + 1);

    try {
      const response = await api.get(`incidents?page=${page}`, {
        headers: { Authorization: ongId },
      });

      if (!response.data.length > 0) {
        setPaginate(false);
        return;
      }

      setIncidents((oldIncidents) => [...oldIncidents, ...response.data]);
    } catch (err) {
      toast.error(
        "Erro ao tentar carregar os casos da sua ONG. Tente novamente"
      );
    }
  }

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (err) {
      toast.error("Erro ao tentar deletar caso.");
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <div className="left">
          <img src={logoImage} alt="Be The Hero" />
          <span>Bem vinda, {ongName}</span>
        </div>

        <div className="rigth">
          <Link className="button" to="/incidents/new">
            Cadastrar novo caso
          </Link>
          <button type="button" onClick={handleLogout}>
            <FiPower size={18} color="#e02041" />
          </button>
        </div>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASO: </strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO: </strong>
            <p>{incident.description}</p>

            <strong>VALOR: </strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(incident.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
      {paginate && (
        <div className="checkMore">
          <button type="button" onClick={handleMoreIncidents}>
            Ver mais
          </button>
        </div>
      )}
    </div>
  );
}
