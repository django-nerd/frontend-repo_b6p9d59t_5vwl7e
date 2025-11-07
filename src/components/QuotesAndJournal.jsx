import React, { useEffect, useState } from 'react'

const QUOTES = [
  'Small steps daily create giant leaps over time.',
  'Progress, not perfection. Ketosis loves consistency.',
  'You don’t have to be extreme, just consistent.',
  'Discipline is remembering what you want most.',
  'Your future self is already proud of you.'
]

export default function QuotesAndJournal({ user }) {
  const api = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [quote, setQuote] = useState(QUOTES[Math.floor(Math.random()*QUOTES.length)])
  const [text, setText] = useState('')
  const [mood, setMood] = useState('good')
  const [entries, setEntries] = useState([])

  const load = async () => {
    if (!user) return
    const res = await fetch(`${api}/api/journal/${user.id}`)
    const data = await res.json()
    setEntries(data.entries || [])
  }
  useEffect(()=>{ load() }, [user])

  const save = async (e) => {
    e.preventDefault()
    if (!user || !text) return
    const on_date = new Date().toISOString().slice(0,10)
    const res = await fetch(`${api}/api/journal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, on_date, mood, text })
    })
    if (res.ok) {
      setText('')
      load()
    }
  }

  return (
    <div className="space-y-4">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg">
        <div className="text-sm opacity-90 mb-1">Motivation</div>
        <div className="text-xl font-semibold">“{quote}”</div>
      </div>

      <div className="p-6 rounded-2xl bg-white shadow-xl border border-slate-200">
        <h3 className="text-slate-800 font-semibold">Success Log</h3>
        <form onSubmit={save} className="mt-3 grid grid-cols-5 gap-2">
          <select value={mood} onChange={(e)=>setMood(e.target.value)} className="input">
            <option value="great">Great</option>
            <option value="good">Good</option>
            <option value="okay">Okay</option>
            <option value="tough">Tough</option>
          </select>
          <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="What went well today?" className="col-span-3 input" />
          <button className="btn">Save</button>
        </form>
        <div className="mt-4 space-y-2 max-h-48 overflow-auto">
          {entries.map(e => (
            <div key={e._id} className="flex items-center justify-between text-sm text-slate-600">
              <span className="text-slate-500">{e.on_date}</span>
              <span className="px-2 py-0.5 rounded-full text-white text-xs bg-indigo-600">{e.mood}</span>
              <span className="flex-1 ml-2">{e.text}</span>
            </div>
          ))}
          {!entries.length && <p className="text-sm text-slate-500">No entries yet.</p>}
        </div>
      </div>
    </div>
  )
}
