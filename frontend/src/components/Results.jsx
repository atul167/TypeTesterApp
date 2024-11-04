// src/components/Results.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';
function Results() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [usernameLoading, setUsernameLoading] = useState(true);

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to view your results.');
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/typing/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(res.data.username);
      } catch (err) {
        console.error('Error fetching username:', err);
        alert('Error fetching username. Please login again. I beg you!!');
        navigate('/login');
      } finally {
        setUsernameLoading(false);
      }
    };
    fetchUsername();
  }, [navigate]);

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to view your results.');
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/typing/results`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(res.data.results);
      } catch (err) {
        console.error('Error fetching results:', err);
        alert('Error fetching results. Please try again.');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [navigate]);

  if (loading || usernameLoading) {
    return <div>Loading your results...</div>;
  }

  return (
    <div className="p-4">
      <h2>Results for {username}:</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        results.map((result) => (
          <div key={result._id} className="border p-2 my-2">
            <div>Words per Minute: {result.wpm}</div>
            <div>Overall Accuracy: {result.accuracy}%</div>
            <div>Test taken at: {new Date(result.date).toLocaleString()}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default Results;
