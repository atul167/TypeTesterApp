// src/components/TypingTest.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import superalgo from '../../../backend/algo';
import API_URL from '../config';
function TypingTest() {
  const [line, setLine] = useState('');
  const [userInput, setUserInput] = useState('');
  const netSamay = 45;
  const [timeLeft, setTimeLeft] = useState(netSamay);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchLine();
    startTimer();

    return () => clearInterval(timerRef.current);
  }, []);

  const preventCopyPaste = (e) => {
    e.preventDefault();
  };

  const fetchLine = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found. Please log in again.');
        navigate('/login');
        return;
      }
      const res = await axios.get(`${API_URL}/typing/line`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLine(res.data.line);
    } catch (err) {
      alert(err.response?.data?.error || 'Error fetching text.');
      console.error('Error in fetchLine:', err.response || err.message);
      navigate('/login');
    }
  };
  const startTimer = () => {
    setTimeLeft(netSamay);
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          submitResult();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const submitResult = async () => {
      clearInterval(timerRef.current);
    const timeTaken = netSamay - timeLeft;
    const { wpm, accuracy } = superalgo(line, userInput, timeTaken);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found. Please log in again.');
        navigate('/login');
        return;
      }
      await axios.post(
        `${API_URL}/typing/result`,
        { wpm, accuracy },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Your result has been saved.');
      navigate('/results');
    } catch (err) {
      alert(err.response?.data?.error || 'Error saving result.');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitResult();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="w-full h-full my-3 mx-4">
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
      <div className="text-3xl text-black text-nowrap">
        Time Left: {timeLeft}s
      </div>
      <div className="text-2xl text-black text-nowrap mt-4">
        The text to type is:
      </div>
      <div
        className="text-2xl text-black text-nowrap mt-2 select-none"
        onCopy={preventCopyPaste}
        onContextMenu={preventCopyPaste}
        onMouseDown={preventCopyPaste}
        onMouseUp={preventCopyPaste}
        onSelect={preventCopyPaste}
      >
        {line}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-24 mt-4 p-2 border border-gray-300 rounded"
          placeholder="Type the text here..."
          value={userInput}
          onChange={handleChange}
          disabled={timeLeft === 0}
          onCopy={preventCopyPaste}
          onPaste={preventCopyPaste}
          onCut={preventCopyPaste}
        ></textarea>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          disabled={timeLeft === 0}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default TypingTest;
