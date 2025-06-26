import React, { useState } from 'react';
import './Recommendations.css';
import { MalLogo } from './assets/logo'
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
      const response = await fetch('https://weebot.dedyn.io/recommendations', {
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
    <div>
      <section className={`section-search${hasSearched ? '--top' : '--centered'}`}>
        { !hasSearched && (
          <h1 className="heading-primary">
            <span className="heading-primary--main">WeeBot</span>
            <span className="heading-primary--sub">Recommend anime based on input with vector DB. Dataset: Anilist 2025</span>
          </h1>
        )}
        <div className="section-search__search">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search or ask in any language (e.g. 'anime sports from 2020')"
            className='section-search__search--input'
            disabled={loading}
          />
        </div>
        { loading && (
          <span className='loader'></span>
        )}
      </section>

      
      { hasSearched && (
      <section className='section-cards'>
        {results?.recommendations?.map(item => (
          <div className='cards'>
            <div className='cards__desc'>
              <h2 className='cards__desc--title'>{item.title}</h2>
              <p className='cards__desc--desc' dangerouslySetInnerHTML={{ __html: item.description }}></p>
              <div className='cards__desc--info'>
                <span className='cards__desc--info--tag'>{item.format}</span>
                <span className='cards__desc--info--tag'>Score: {item.averageScore}</span>
                <span className='cards__desc--info--tag'>Popularity: {item.popularity}</span>
                <a href={`https://anilist.co/anime/${item.id}`} target="_blank" rel="noopener noreferrer" className='cards__desc--info--tag-anilist'><img src={anilist} alt='anilist'/></a>
                <a href={`https://myanimelist.net/anime/${item.idMal}`} target="_blank" rel="noopener noreferrer" className='cards__desc--info--tag-mal'><MalLogo /></a>
              </div>
              <div className='cards__desc--genres'>
                {item?.genres?.map(genre => (
                  <span className='cards__desc--genres--tag'>{genre}</span>
                ))}
              </div>
            </div>
            <div className='cards__img'>
              <img src={item.cover} alt='cover'/>
            </div>
          </div>
        ))}
      </section>
      )}
    </div>
  )
}

export default RecommendationUI