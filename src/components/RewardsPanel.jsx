import React, { useEffect, useState } from 'react'

export default function RewardsPanel({ user }) {
  const api = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [title, setTitle] = useState('New shoes')
  const [milestone, setMilestone] = useState(5)
  const [rewards, setRewards] = useState([])

  const load = async () => {
    if (!user) return
    const res = await fetch(`${api}/api/reward/${user.id}`)
    const data = await res.json()
    setRewards(data.entries || [])
  }
  useEffect(()=>{ load() }, [user])

  const add = async (e) => {
    e.preventDefault()
    if (!user) return
    const res = await fetch(`${api}/api/reward`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, milestone: Number(milestone), title })
    })
    if (res.ok) {
      setTitle('')
      load()
    }
  }

  return (
    <div className="p-6 rounded-2xl bg-white shadow-xl border border-slate-200">
      <h3 className="text-slate-800 font-semibold">Rewards</h3>
      <p className="text-sm text-slate-500">Create little prizes for milestone losses to celebrate progress.</p>
      <form onSubmit={add} className="mt-3 grid grid-cols-3 gap-2">
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Reward title" className="input" />
        <input value={milestone} onChange={(e)=>setMilestone(e.target.value)} type="number" step="0.1" className="input" placeholder="Milestone (lost)" />
        <button className="btn">Add</button>
      </form>
      <div className="mt-4 space-y-2 max-h-48 overflow-auto">
        {rewards.map(r => (
          <div key={r._id} className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">{r.title}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs">{r.milestone} {user?.units}</span>
          </div>
        ))}
        {!rewards.length && <p className="text-sm text-slate-500">No rewards yet.</p>}
      </div>
    </div>
  )
}
