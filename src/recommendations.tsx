import React, { useState } from 'react';
// import { Search } from 'lucide-react';
import './Recommendations.css';

interface RecommendationResponse {
  recommendations?: any[];
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
        body: JSON.stringify({ text_input: query }),
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
      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="example: 'Recommends me anime about sports'"
        className='recommendations-text'
        disabled={loading}
      />

      { hasSearched && (
      <div>
        <p>`${results?.recommendations}`</p>
      </div>
      )};
    </div>
  )
}

export default RecommendationUI