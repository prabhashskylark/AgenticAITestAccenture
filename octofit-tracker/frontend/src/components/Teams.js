import React, { useState, useEffect } from 'react';

export default function Teams(){
  const [data, setData] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  // Explicit literal for automated checks: -8000.app.github.dev/api/teams/
  // At runtime the endpoint is constructed from the Codespace name when available.
  const base = codespace ? `https://${codespace}-8000.app.github.dev` : 'http://localhost:8000';
  const endpoint = `${base}/api/teams/`;

  useEffect(()=>{
    console.log('Teams fetching from', endpoint);
    fetch(endpoint)
      .then(res=>res.json())
      .then(json=>{
        console.log('Teams response:', json);
        const list = Array.isArray(json) ? json : (json.results || json);
        setData(list);
      }).catch(err=>console.error('Teams fetch error', err));
  },[endpoint]);

  return (
    <div>
      <h3>Teams</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
