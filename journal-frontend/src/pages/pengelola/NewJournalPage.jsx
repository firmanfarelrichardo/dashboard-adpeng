import { useState } from 'react';
import { api } from '../../lib/api';
import { useNavigate } from 'react-router-dom';

export default function NewJournalPage(){
  const nav = useNavigate();
  const [form,setForm]=useState({
    contact_name:'', contact_email:'', institution:'', faculty:'', journal_url:''
  });
  const [err,setErr]=useState('');

  const submit = async (e)=>{
    e.preventDefault(); setErr('');
    try{
      const {data} = await api.post('/my/journals', form);
      nav(`/pengelola/journals/${data.id}/preview`);
    }catch(e){ setErr('Pastikan semua form diisi dengan benar'); }
  };

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-xl font-bold">Daftarkan Jurnal</h1>
      {err && <div className="text-red-600">{err}</div>}
      <form onSubmit={submit} className="space-y-2">
        {['contact_name','contact_email','institution','faculty','journal_url'].map(k=>(
          <input key={k} className="input" placeholder={k.replace('_',' ')} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/>
        ))}
        <button className="btn-primary">Simpan & Lihat Preview</button>
      </form>
    </div>
  )
}
