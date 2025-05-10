import React, { useState } from 'react';

function App() {
  const [input, setInput]   = useState('{ "data": ["a","1","334","4","R"] }');
  const [resp, setResp]     = useState(null);
  const [err, setErr]       = useState('');
  const [filter, setFilter] = useState('odd_numbers');

  const onSubmit = async e => {
    e.preventDefault();
    setErr(''); setResp(null);

    let body;
    try {
      body = JSON.parse(input);
    } catch {
      return setErr('Invalid JSON');
    }

    try {
      const r = await fetch('http://localhost:3000/process', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body)
      });
      if (!r.ok) throw new Error(`Status ${r.status}`);
      setResp(await r.json());
    } catch (e) {
      setErr('Request failed: ' + e.message);
    }
  };

  const renderData = () => {
    if (!resp) return null;

    // Build output object with permanent fields
    const output = {
      is_success: resp.is_success,
      user_id:    resp.user_id,
      email:      resp.email,
      roll_number:resp.roll_number
    };
    // Add only the selected category array
    output[filter] = resp[filter];

    return (
      <div style={{ marginTop: 20 }}>
        <label>
          Choose category: &nbsp;
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="odd_numbers">Odd Numbers</option>
            <option value="even_numbers">Even Numbers</option>
            <option value="alphabets">Alphabets</option>
          </select>
        </label>
        <pre style={{ background: '#f7f7f7', padding: 10, marginTop: 10 }}>
          {JSON.stringify(output, null, 2)}
        </pre>
      </div>
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Process API</h1>
      <form onSubmit={onSubmit}>
        <textarea
          rows={4} cols={50}
          value={input}
          onChange={e => setInput(e.target.value)}
        /><br/>
        <button type="submit">Send</button>
      </form>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      {renderData()}
    </div>
  );
}

export default App;
