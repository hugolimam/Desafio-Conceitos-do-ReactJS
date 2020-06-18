import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [titleRepo, setTitleRepo] = useState("");
  const [linkRepo, setLinkRepo] = useState("");

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);
  async function handleAddRepository() {
    await api
      .post("repositories", {
        title: titleRepo,
        url: linkRepo,
      })
      .then((response) => {
        setRepositories([...repositories, response.data]);
      });
    setTitleRepo("");
    setLinkRepo("");
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((repo) => repo.id !== id));
  }
  return (
    <div className="all-page">
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            <div>{repository.title}</div>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <div>
        <input
          placeholder="Titulo do Repositório"
          onChange={(e) => setTitleRepo(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Link de acesso"
          onChange={(e) => setLinkRepo(e.target.value)}
        />
        <div>
          <button onClick={handleAddRepository}>Adicionar</button>
        </div>
      </div>
    </div>
  );
}

export default App;
