import React, { useEffect, useState } from 'react'

export default function TrackerPanel({ user }) {
  const api = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [weight, setWeight] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))
  const [entries, setEntries] = useState([])
  const [message, setMessage] = useState('')

  const load = async () => {
    if (!user) return
    const res = await fetch(`${api}/api/weight/${user.id}`)
    const data = await res.json()
    setEntries(data.entries || [])
  }

  useEffect(() => { load() }, [user])

  const add = async (e) => {
    e.preventDefault()
    if (!user) return
    const res = await fetch(`${api}/api/weight`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, on_date: date, weight: Number(weight) })
    })
    if (res.ok) {
      setMessage('Saved!')
      setWeight('')
      load()
    }
  }

  const start = user?.starting_weight ?? 0
  const current = entries.length ? entries[entries.length-1].weight : user?.current_weight ?? start
  const lost = (start && current) ? (start - current) : 0

  return (
    <div className="p-6 rounded-2xl bg-white shadow-xl border border-slate-200">
      <h3 className="text-slate-800 font-semibold">Weight Tracker</h3>
      <p className="text-sm text-slate-500">Start: <b>{start}</b> {user?.units} • Current: <b>{current}</b> {user?.units} • Lost: <b className="text-emerald-600">{lost.toFixed(1)}</b> {user?.units}</p>
      <form onSubmit={add} className="mt-4 grid grid-cols-3 gap-2">
        <input value={date} onChange={(e)=>setDate(e.target.value)} type="date" className="input" />
        <input value={weight} onChange={(e)=>setWeight(e.target.value)} type="number" step="0.1" placeholder={`Weight (${user?.units})`} className="input" />
        <button className="btn">Add</button>
      </form>
      {message && <p className="text-xs text-emerald-600 mt-1">{message}</p>}
      <div className="mt-4 max-h-40 overflow-auto space-y-1">
        {entries.map(e => (
          <div key={e._id} className="text-sm flex justify-between text-slate-600">
            <span>{e.on_date}</span>
            <span className="font-medium">{e.weight} {user?.units}</span>
          </div>
        ))}
        {!entries.length && <p className="text-sm text-slate-500">No entries yet.</p>}
      </div>
    </div>
  )}
