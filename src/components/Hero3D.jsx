import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero3D() {
  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-sky-600 shadow-xl">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4TrRyLcIHhcItjnk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0b1e]/70 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex items-end pb-10">
        <div className="text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm">Real-time fasting & keto timer</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Keto Momentum
          </h1>
          <p className="mt-3 text-white/90 max-w-xl">
            Track your keto journey with a futuristic vibe — timer, progress, journal & rewards. Press 'E' on the hourglass to interact.
          </p>
        </div>
      </div>
    </section>
  )
}
