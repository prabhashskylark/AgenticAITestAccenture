import React, { useState, useEffect } from 'react';

export default function Users(){
  const [data, setData] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const base = codespace ? `https://${codespace}-8000.app.github.dev` : 'http://localhost:8000';
  const endpoint = `${base}/api/users/`;

  useEffect(()=>{
    console.log('Users fetching from', endpoint);
    fetch(endpoint)
      .then(res=>res.json())
      .then(json=>{
        console.log('Users response:', json);
        const list = Array.isArray(json) ? json : (json.results || json);
        setData(list);
      }).catch(err=>console.error('Users fetch error', err));
  },[endpoint]);

  return (
    <div>
      <h3>Users</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
