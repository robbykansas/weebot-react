import React, { useState } from 'react';
import './Recommendations.css';
import mal from './assets/mal-logo.png'
import anilist from './assets/anilist-logo.png'

interface RecommendationResponse {
  recommendations?: [
    {
      title: string;
      description: string;
      genres: string[];
      id: number;
      idMal: number;
      format: string;
      averageScore: number;
      popularity: number;
      cover: string
    }
  ];
  error?: string;
}

const RecommendationUI: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handle = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setResults(null);
    setHasSearched(true);

    try {
      const response = await fetch('http://localhost:8000/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_text: query }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handle();
    }
  };

  return (
    <div className={`recommendations-container ${hasSearched ? 'top' : 'centered'}`}>
      { !hasSearched && (
        <div className="app-container">
          <h1 className="app-title">WeeBot</h1>
          <p className="app-tagline">Recommend anime based on input with vector DB</p>
        </div>
      )}
      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="example: 'Recommends me anime about sports'"
        className='recommendations-text'
        disabled={loading}
      />
      { loading && (
        <span className='loader'></span>
      )}

      { hasSearched && (
      <div className='result-container'>
        {results?.recommendations?.map(item => (
          <div className='cards-container'>
            <div className='cards-description-container'>
              <h2 className='desc-title'>{item.title}</h2>
              <p className='desc-description' dangerouslySetInnerHTML={{ __html: item.description }}></p>
              <div className='desc-info'>
                <span className='info-tag'>{item.format}</span>
                <span className='info-tag'>Score: {item.averageScore}</span>
                <span className='info-tag'>Popularity: {item.popularity}</span>
                <a href={`https://anilist.co/anime/${item.idMal}`} target="_blank" rel="noopener noreferrer" className='info-anilist'><img src={anilist} alt='anilist'/></a>
                <a href={`https://myanimelist.net/anime/${item.idMal}`} target="_blank" rel="noopener noreferrer" className='info-mal'><img src={mal} alt='mal'/></a>
              </div>
              <div className='desc-genres'>
                {item?.genres?.map(genre => (
                  <span className='genre-tag'>{genre}</span>
                ))}
              </div>
            </div>
            <div className='cards-image'>
              <img src={item.cover} alt='cover'/>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  )
}

export default RecommendationUI