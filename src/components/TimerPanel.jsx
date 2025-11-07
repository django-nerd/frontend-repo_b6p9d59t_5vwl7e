import React, { useEffect, useRef, useState } from 'react'

function format(ms) {
  const total = Math.floor(ms / 1000)
  const h = Math.floor(total / 3600).toString().padStart(2, '0')
  const m = Math.floor((total % 3600) / 60).toString().padStart(2, '0')
  const s = Math.floor(total % 60).toString().padStart(2, '0')
  return `${h}:${m}:${s}`
}

export default function TimerPanel() {
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef(0)

  useEffect(() => {
    let id
    if (running) {
      startRef.current = Date.now() - elapsed
      id = setInterval(() => setElapsed(Date.now() - startRef.current), 250)
    }
    return () => id && clearInterval(id)
  }, [running])

  const reset = () => {
    setRunning(false)
    setElapsed(0)
  }

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-600/90 to-fuchsia-600/90 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Fasting Timer</h3>
        <div className="text-3xl font-mono tracking-widest">{format(elapsed)}</div>
      </div>
      <div className="mt-4 flex gap-2">
        {!running ? (
          <button onClick={() => setRunning(true)} className="btn">Start</button>
        ) : (
          <button onClick={() => setRunning(false)} className="btn">Pause</button>
        )}
        <button onClick={reset} className="btn btn-ghost">Reset</button>
      </div>
      <p className="mt-3 text-white/80 text-sm">Use this to track fasting or workout blocks while in ketosis.</p>
    </div>
  )
}
