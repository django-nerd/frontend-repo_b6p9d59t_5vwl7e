import React, { useState } from 'react'

export default function AuthCard({ onAuth }) {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '', starting_weight: 180, units: 'lb' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const api = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'register') {
        const res = await fetch(`${api}/api/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
            starting_weight: Number(form.starting_weight),
            units: form.units,
          }),
        })
        if (!res.ok) throw new Error('Registration failed')
        // auto-login
      }
      const res2 = await fetch(`${api}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      })
      if (!res2.ok) throw new Error('Login failed')
      const data = await res2.json()
      onAuth(data.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h3>
        <button
          className="text-sm text-indigo-600 hover:text-indigo-700"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        >
          {mode === 'login' ? 'Need an account?' : 'Have an account?'}
        </button>
      </div>
      <form onSubmit={submit} className="space-y-3">
        {mode === 'register' && (
          <div className="grid grid-cols-2 gap-3">
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="col-span-2 input" />
            <input name="starting_weight" value={form.starting_weight} onChange={handleChange} type="number" min="1" step="0.1" className="input" placeholder="Starting weight" />
            <select name="units" value={form.units} onChange={handleChange} className="input">
              <option value="lb">lb</option>
              <option value="kg">kg</option>
            </select>
          </div>
        )}
        <input name="email" value={form.email} onChange={handleChange} type="email" required placeholder="Email" className="input" />
        <input name="password" value={form.password} onChange={handleChange} type="password" required placeholder="Password" className="input" />
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button disabled={loading} className="w-full py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-semibold shadow hover:opacity-90 transition">
          {loading ? 'Please wait…' : mode === 'login' ? 'Login' : 'Create & Login'}
        </button>
      </form>
    </div>
  )
}
