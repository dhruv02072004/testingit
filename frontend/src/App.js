import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('{ "data": ["a","1","334","4","R"] }');
  const [resp, setResp] = useState(null);
  const [err, setErr] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    setErr(''); setResp(null);
    let body;
    try { body = JSON.parse(input) }
    catch { return setErr('Invalid JSON') }

    try {
      const r = await fetch('https://testingit-gmmz.onrender.com/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      setResp(await r.json());
    } catch {
      setErr('Request failed');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Process API</h1>
      <form onSubmit={onSubmit}>
        <textarea
          rows={4} cols={50}
          value={input}
          onChange={e=>setInput(e.target.value)}
        /><br/>
        <button type="submit">Send</button>
      </form>
      {err && <p style={{ color:'red' }}>{err}</p>}
      {resp && <pre>{JSON.stringify(resp, null, 2)}</pre>}
    </div>
  );
}

export default App;
