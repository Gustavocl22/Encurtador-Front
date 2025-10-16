import React, { useState, useEffect } from "react";
import axios from "axios";
import './UrlShortener.css';

interface UrlShortener {
  id: number;
  originalUrl: string;
  shortenedUrl: string;
  clicks: number;
  createdAt: string;
}

const UrlShortenerForm: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState<UrlShortener[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof UrlShortener>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const itemsPerPage = 5;

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://encurtarurl.onrender.com/api/urlshortener";

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);
  const response = await axios.get(API_BASE_URL);
  setShortenedUrls(response.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erro ao buscar URLs. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    // Validação melhorada de URL
    try {
      new URL(originalUrl);
    } catch (_) {
      setError("Insira uma URL válida (ex: https://exemplo.com)");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(API_BASE_URL, { originalUrl });
      setOriginalUrl("");
      setSuccess("URL encurtada com sucesso!");
      setShortenedUrls(prev => [response.data, ...prev]);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erro ao encurtar a URL. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta URL encurtada?")) {
      return;
    }

    try {
  await axios.delete(`${API_BASE_URL}/${id}`);
  setSuccess("URL deletada com sucesso!");
  fetchUrls();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erro ao deletar a URL. Atualize a página e tente novamente.");
    }
  };

  const handleSort = (field: keyof UrlShortener) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedUrls = [...shortenedUrls].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUrls = sortedUrls.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedUrls.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const SortIcon: React.FC<{ field: keyof UrlShortener }> = ({ field }) => {
    if (sortField !== field) return <span>↕️</span>;
    return sortDirection === "asc" ? <span>⬆️</span> : <span>⬇️</span>;
  };

  return (
    <div className="encurtador-container">
      <div className="card">
        <h1>🔗 Encurtador de URLs</h1>
        <p className="subtitle">Encurte seus links longos de forma rápida e fácil</p>

        <form onSubmit={handleSubmit} className="url-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="https://exemplo.com/url-muito-longa..."
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              aria-label="Campo para inserir URL"
              disabled={loading}
            />
            <button
              type="submit"
              aria-label="Encurtar URL"
              disabled={loading || !originalUrl}
              className={loading ? "loading" : ""}
            >
              {loading ? "⏳" : "🔗"} {loading ? "Encurtando..." : "Encurtar URL"}
            </button>
          </div>
        </form>

        {error && (
          <div className="message error-message">
            <span>⚠️</span> {error}
          </div>
        )}
        {success && (
          <div className="message success-message">
            <span>✅</span> {success}
          </div>
        )}

        <div className="divider"></div>

        <div className="table-header">
          <h2>Suas URLs Encurtadas</h2>
          {shortenedUrls.length > 0 && (
            <div className="table-controls">
              <span className="results-count">{shortenedUrls.length} resultado(s)</span>
              <button onClick={fetchUrls} className="refresh-btn" title="Atualizar lista">
                🔄
              </button>
            </div>
          )}
        </div>

        {loading && shortenedUrls.length === 0 ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Carregando URLs...</p>
          </div>
        ) : shortenedUrls.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔗</div>
            <h3>Nenhuma URL encurtada ainda</h3>
            <p>Encurte sua primeira URL usando o campo acima!</p>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="url-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort("originalUrl")}>
                      <div className="th-content">
                        URL Original <SortIcon field="originalUrl" />
                      </div>
                    </th>
                    <th onClick={() => handleSort("shortenedUrl")}>
                      <div className="th-content">
                        URL Encurtada <SortIcon field="shortenedUrl" />
                      </div>
                    </th>
                    <th onClick={() => handleSort("clicks")}>
                      <div className="th-content">
                        Cliques <SortIcon field="clicks" />
                      </div>
                    </th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUrls.map(url => (
                    <tr key={url.id}>
                      <td>
                        <a
                          href={url.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="original-url"
                          title={url.originalUrl}
                        >
                          {url.originalUrl.replace(/^https?:\/\//, '').replace('www.', '')}
                        </a>
                      </td>
                      <td>
                        <div className="short-url-container">
                          <a
                            href={`${API_BASE_URL}/${url.shortenedUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="short-url-link"
                            title={`${API_BASE_URL}/${url.shortenedUrl}`}
                          >
                            {url.shortenedUrl}
                          </a>
                          <button
                            className="icon-btn copy-btn"
                            title="Copiar link"
                            aria-label="Copiar link encurtado"
                            onClick={() => {
                              const shareUrl = `${API_BASE_URL}/${url.shortenedUrl}`;
                              navigator.clipboard.writeText(shareUrl);
                              setCopiedId(url.id);
                              setTimeout(() => setCopiedId(null), 1500);
                            }}
                          >
                            {copiedId === url.id ? '✅' : '📋'}
                          </button>
                          {navigator.share && (
                            <button
                              className="icon-btn share-btn"
                              title="Compartilhar link"
                              aria-label="Compartilhar link encurtado"
                              onClick={() => {
                                const shareUrl = `${API_BASE_URL}/${url.shortenedUrl}`;
                                navigator.share({
                                  title: "Link encurtado",
                                  text: "Confira este link encurtado:",
                                  url: shareUrl,
                                });
                              }}
                            >
                              ↗️
                            </button>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="clicks-count">{url.clicks}</span>
                      </td>
                      <td>
                        <button
                          className="icon-btn delete-btn"
                          aria-label="Deletar URL"
                          title="Excluir URL"
                          onClick={() => handleDelete(url.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  &laquo;
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => paginate(page)}
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  &raquo;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UrlShortenerForm;