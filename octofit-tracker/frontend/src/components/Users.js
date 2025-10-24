import React, { useState, useEffect, useCallback } from 'react';
import { BASE_API_URL } from '../config';

export default function Users(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const endpoint = `${BASE_API_URL}/users/`;

  const load = useCallback(()=>{
    setLoading(true);
    setError(null);
    console.log('Users fetching from', endpoint);
    fetch(endpoint)
      .then(res=>res.json())
      .then(json=>{
        console.log('Users response:', json);
        const list = Array.isArray(json) ? json : (json.results || json);
        console.log('Users normalized list length:', Array.isArray(list) ? list.length : 'n/a');
        setData(list);
      }).catch(err=>{
        console.error('Users fetch error', err);
        setError(String(err));
      }).finally(()=>setLoading(false));
  }, [endpoint]);

  useEffect(()=>{ load(); },[load]);

  const visible = data.filter(item => !filter || JSON.stringify(item).toLowerCase().includes(filter.toLowerCase()));
  const keys = visible.length > 0 ? Object.keys(visible[0]) : [];

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title h4">Users</h3>

        <div className="d-flex mb-3">
          <input className="form-control me-2" placeholder="Filter..." value={filter} onChange={e=>setFilter(e.target.value)} />
          <button className="btn btn-primary me-2" onClick={load} disabled={loading}>{loading ? 'Loading...' : 'Refresh'}</button>
          <button className="btn btn-secondary" onClick={()=>setFilter('')}>Clear</button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {visible.length === 0 ? (
          <div className="text-muted">No users to display.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>{keys.map(k => <th key={k}>{k}</th>)}<th>Actions</th></tr>
              </thead>
              <tbody>
                {visible.map((row, idx) => (
                  <tr key={idx}>
                    {keys.map(k => <td key={k}>{typeof row[k] === 'object' ? JSON.stringify(row[k]) : String(row[k])}</td>)}
                    <td><button className="btn btn-sm btn-outline-primary" onClick={()=>setSelected(row)}>View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selected && (
          <div className="modal show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">User Details</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={()=>setSelected(null)} />
                </div>
                <div className="modal-body"><pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(selected, null, 2)}</pre></div>
                <div className="modal-footer"><button className="btn btn-secondary" onClick={()=>setSelected(null)}>Close</button></div>
              </div>
            </div>
            <div className="modal-backdrop show" />
          </div>
        )}
      </div>
    </div>
  );
}
