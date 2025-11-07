import React, { useState } from 'react'
import Hero3D from './components/Hero3D'
import AuthCard from './components/AuthCard'
import TimerPanel from './components/TimerPanel'
import TrackerPanel from './components/TrackerPanel'
import QuotesAndJournal from './components/QuotesAndJournal'
import RewardsPanel from './components/RewardsPanel'

function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#0b132b] to-[#0f172a] text-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-6 space-y-8">
        <Hero3D />

        {!user ? (
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <AuthCard onAuth={setUser} />
            <div className="space-y-4">
              <TimerPanel />
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="font-semibold">Why Keto Momentum?</h3>
                <p className="text-slate-300 text-sm mt-1">A sleek, motivating space to track fasting, weight, reflections and reward milestones — all wrapped in calming blues and purples.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="space-y-4 lg:col-span-2">
              <TimerPanel />
              <TrackerPanel user={user} />
              <QuotesAndJournal user={user} />
            </div>
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white shadow-lg">
                <div className="text-sm opacity-90">Logged in as</div>
                <div className="text-xl font-semibold">{user.name}</div>
                <button onClick={() => setUser(null)} className="mt-3 btn btn-ghost text-white border-white/30">Log out</button>
              </div>
              <RewardsPanel user={user} />
            </div>
          </div>
        )}
      </div>

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
