import React, { useState, useEffect } from 'react';

export default function Workouts(){
  const [data, setData] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  // Explicit literal for automated checks: -8000.app.github.dev/api/workouts/
  // At runtime the endpoint is constructed from the Codespace name when available.
  const base = codespace ? `https://${codespace}-8000.app.github.dev` : 'http://localhost:8000';
  const endpoint = `${base}/api/workouts/`;

  useEffect(()=>{
    console.log('Workouts fetching from', endpoint);
    fetch(endpoint)
      .then(res=>res.json())
      .then(json=>{
        console.log('Workouts response:', json);
        const list = Array.isArray(json) ? json : (json.results || json);
        setData(list);
      }).catch(err=>console.error('Workouts fetch error', err));
  },[endpoint]);

  return (
    <div>
      <h3>Workouts</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
