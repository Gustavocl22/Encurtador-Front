import React, { useState, useEffect } from "react";
import axios from "axios";
import './UrlShortener.css';

interface UrlShortener {
  id: number;
  originalUrl: string;
  shortenedUrl: string;
  clicks: number;
}

const UrlShortenerForm: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState<UrlShortener[]>([]);
  const [error, setError] = useState("");


  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5049/api/urlshortener";

  useEffect(() => {
    fetchUrls();
  }, []);


  const fetchUrls = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setShortenedUrls(response.data);
    } catch (err) {
      setError("Erro ao buscar URLs. Verifique sua conexão.");
    }
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!originalUrl) {
      setError("Por favor, insira uma URL válida.");
      return;
    }

    try {
      const response = await axios.post(API_BASE_URL, {
        originalUrl
      });

      const newUrl: UrlShortener = {
        id: response.data.id,
        originalUrl: response.data.originalUrl,
        shortenedUrl: response.data.shortenedUrl,
        clicks: 0
      };

      setShortenedUrls([...shortenedUrls, newUrl]);
      setOriginalUrl("");
    } catch (err) {
      setError("Erro ao encurtar a URL. Tente novamente.");
    }
  };


  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setShortenedUrls(shortenedUrls.filter(url => url.id !== id));
    } catch (err) {
      setError("Erro ao deletar a URL. Atualize a página e tente novamente.");
    }
  };

  return (
    <div>
      <h1>Encurtador de URLs</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Coloque sua URL..."
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button type="submit">Encurtar URL</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <h2>URLs Encurtadas</h2>
      <ul>
        {shortenedUrls.map(url => (
          <li key={url.id}>
            <a href={`${API_BASE_URL}/${url.shortenedUrl}`} target="_blank" rel="noopener noreferrer">
              Shortener/{url.shortenedUrl}
            </a> - Clicks: {url.clicks}
            <button className="delete" onClick={() => handleDelete(url.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlShortenerForm;
