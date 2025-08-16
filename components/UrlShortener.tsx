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
  const [success, setSuccess] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://encurtarurl.onrender.com/api/urlshortener";

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setShortenedUrls(response.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erro ao buscar URLs. Verifique sua conexão.");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    // Validação básica de URL
    if (!/^https?:\/\/.+\..+/.test(originalUrl)) {
      setError("Insira uma URL válida (ex: https://...)");
      return;
    }

    try {
      await axios.post(API_BASE_URL, { originalUrl });
      setOriginalUrl("");
      setSuccess("URL encurtada com sucesso!");
      fetchUrls();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erro ao encurtar a URL. Tente novamente.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setSuccess("URL deletada com sucesso!");
      fetchUrls();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erro ao deletar a URL. Atualize a página e tente novamente.");
    }
  };

  return (
    <>
      <div className="encurtador-container">
        <h1>Encurtador de URLs</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Coloque sua URL..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            aria-label="Campo para inserir URL"
          />
          <button type="submit" aria-label="Encurtar URL">
            <span role="img" aria-label="link">🔗</span> Encurtar URL
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <hr />

        <h2>URLs Encurtadas</h2>
        <table className="url-table">
          <thead>
            <tr>
              <th>Original</th>
              <th>Encurtada</th>
              <th>Cliques</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {shortenedUrls.map(url => (
              <tr key={url.id}>
                <td>
                  <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                    {url.originalUrl.length > 30
                      ? url.originalUrl.slice(0, 30) + "..."
                      : url.originalUrl}
                  </a>
                </td>
                <td className="flex-row">
                  <a
                    href={`${API_BASE_URL}/${url.shortenedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="short-url-link"
                  >
                    Shortener/{url.shortenedUrl}
                  </a>
                  <button
                    className="share-btn"
                    title="Compartilhar link"
                    aria-label="Compartilhar link encurtado"
                    onClick={() => {
                      const shareUrl = `${API_BASE_URL}/${url.shortenedUrl}`;
                      if (navigator.share) {
                        navigator.share({
                          title: "Veja este link encurtado!",
                          text: "Confira este link encurtado:",
                          url: shareUrl,
                        });
                      } else {
                        navigator.clipboard.writeText(shareUrl);
                        setCopiedId(url.id);
                        setTimeout(() => setCopiedId(null), 1500);
                      }
                    }}
                  >
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5084C1"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" /></svg>
                    </svg>
                  </button>
                  {copiedId === url.id && (
                    <span className="copied-msg">Copiado!</span>
                  )}
                </td>
                <td className="centered">{url.clicks}</td>
                <td className="centered">
                  <button
                    className="delete"
                    aria-label="Deletar URL"
                    onClick={() => handleDelete(url.id)}
                  >
                    <svg width="18" height="18" fill="currentColor" className="delete-icon" viewBox="0 0 24 24"><path d="M3 6h18v2H3V6zm2 3h14v13H5V9zm3 2v9h2v-9H8zm4 0v9h2v-9h-2z" /></svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  );
};

export default UrlShortenerForm;
