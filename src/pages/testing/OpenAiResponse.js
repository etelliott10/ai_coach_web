import React, { useState } from 'react';

const ChatApp = () => {
  const [inputText, setInputText] = useState('');
  const [aiRole, setAiRole] = useState('judge'); // Default role
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText, ai_role: aiRole }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const data = await response.json();
      setAiResponse(data.response);
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select AI Role:</label>
          <select value={aiRole} onChange={(e) => setAiRole(e.target.value)}>
            <option value="judge">Judge</option>
            <option value="stay_home_mother">Stay Home Mother</option>
            <option value="sassy_woman">Sassy Woman</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your message..."
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            Send
          </button>
        </div>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {aiResponse && <p>{aiResponse}</p>}
    </div>
  );
};

export default ChatApp;
