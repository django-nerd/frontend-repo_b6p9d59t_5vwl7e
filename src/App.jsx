import React, { useState } from 'react'
import Hero3D from './components/Hero3D'
import AuthCard from './components/AuthCard'
import TimerPanel from './components/TimerPanel'
import QuotesAndJournal from './components/QuotesAndJournal'
import RewardsPanel from './components/RewardsPanel'

function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('landing') // landing | dashboard

  const handleAuth = (u) => {
    setUser(u)
    setPage('dashboard')
  }

  const logout = () => {
    setUser(null)
    setPage('landing')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#0b132b] to-[#0f172a] text-slate-100">
      {/* HEADER / SIMPLE NAV */}
      <header className="sticky top-0 z-20 bg-[#0b1020]/70 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold tracking-wide">Keto Momentum</span>
          </div>
          <nav className="flex items-center gap-3">
            {user ? (
              <>
                <button
                  onClick={() => setPage('dashboard')}
                  className={`px-3 py-1.5 rounded-lg text-sm ${page==='dashboard' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                >Dashboard</button>
                <div className="hidden md:block text-sm text-white/70">{user.name}</div>
                <button onClick={logout} className="btn btn-ghost text-white/90 border-white/20">Log out</button>
              </>
            ) : (
              <button onClick={() => setPage('landing')} className="px-3 py-1.5 rounded-lg text-sm hover:bg-white/5">Home</button>
            )}
          </nav>
        </div>
      </header>

      {/* PAGES */}
      {page === 'landing' && (
        <main className="max-w-6xl mx-auto px-6 py-6 space-y-8">
          <Hero3D />
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <AuthCard onAuth={handleAuth} />
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="font-semibold">Why Keto Momentum?</h3>
                <p className="text-slate-300 text-sm mt-1">A sleek, motivating space to track fasting, reflections and reward milestones — wrapped in calming blues and purples.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="font-semibold mb-1">How it works</h4>
                <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                  <li>Create your account or log in</li>
                  <li>Head to your dashboard</li>
                  <li>Start the fasting timer, reflect with daily quotes</li>
                  <li>Unlock milestones with rewards along the way</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      )}

      {page === 'dashboard' && user && (
        <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <TimerPanel />
              <QuotesAndJournal user={user} />
            </div>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white shadow-lg">
                <div className="text-sm opacity-90">Welcome back</div>
                <div className="text-xl font-semibold">{user.name}</div>
              </div>
              <RewardsPanel user={user} />
            </div>
          </div>
        </main>
      )}

      {/* Reusable styles */}
      <style>{`
        .input { @apply w-full px-3 py-2 rounded-xl bg-white/70 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500; }
        .btn { @apply inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-semibold shadow hover:opacity-90 transition; }
        .btn-ghost { @apply bg-transparent border border-slate-300 text-slate-700 hover:bg-white/20; }
      `}</style>
    </div>
  )
}

export default App
