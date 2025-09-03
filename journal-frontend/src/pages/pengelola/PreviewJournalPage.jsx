import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api.js';

export default function PreviewJournalPage(){
  const { id } = useParams(); const nav = useNavigate();
  const [j,setJ]=useState(null);
  const [confirm1,setC1]=useState(false);
  const [confirm2,setC2]=useState(false);

  useEffect(()=>{ (async()=>{ const {data}=await api.get(`/my/journals/${id}`); setJ(data); })(); },[id]);

  const doSubmit = async ()=>{
    if(!confirm1 || !confirm2){ alert('Checklist verifikasi 2 langkah dulu ya ✌️'); return; }
    await api.post(`/my/journals/${id}/submit`);
    nav('/pengelola/journals');
  };

  if(!j) return null;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Preview Jurnal</h1>
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="font-semibold">{j.institution} • {j.faculty}</div>
        <div className="text-sm text-gray-600">{j.contact_name} ({j.contact_email})</div>
        <a className="underline" href={j.journal_url} target="_blank">{j.journal_url}</a>
      </div>

      <div className="bg-yellow-50 p-4 rounded-xl">
        <label className="block"><input type="checkbox" checked={confirm1} onChange={e=>setC1(e.target.checked)} /> Saya sudah meninjau data sudah benar.</label>
        <label className="block"><input type="checkbox" checked={confirm2} onChange={e=>setC2(e.target.checked)} /> Saya paham pengajuan akan diperiksa admin.</label>
      </div>

      <button onClick={doSubmit} className="btn-primary">Upload / Ajukan (Submit)</button>
    </div>
  )
}
