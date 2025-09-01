import { useEffect, useState } from 'react';
import { api } from '../../lib/api';

export default function MyJournalsPage(){
  const [items,setItems]=useState([]);
  const load=async()=>{ const {data}=await api.get('/my/journals'); setItems(data); };
  useEffect(()=>{ load(); },[]);

  const request = async (id,type)=>{
    const message = prompt(`Pesan untuk ${type}? (opsional)`) || '';
    await api.post(`/my/journals/${id}/request`,{type,message});
    alert('Permintaan dikirim ke admin');
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Jurnal Saya</h1>
      <table className="w-full bg-white rounded-xl shadow text-sm">
        <thead><tr><th className="p-3 text-left">Jurnal</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          {items.map(j=>(
            <tr key={j.id} className="border-t">
              <td className="p-3">
                <div className="font-semibold">{j.institution} • {j.faculty}</div>
                <a className="underline" href={j.journal_url} target="_blank">{j.journal_url}</a>
              </td>
              <td className="capitalize">{j.status}</td>
              <td className="p-3 space-x-2">
                {j.status==='draft' && <a href={`/pengelola/journals/${j.id}/preview`} className="underline">Preview & Submit</a>}
                {j.status!=='draft' && <>
                  <button onClick={()=>request(j.id,'edit')} className="underline">Ajukan Edit</button>
                  <button onClick={()=>request(j.id,'delete')} className="underline text-red-600">Ajukan Hapus</button>
                </>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
