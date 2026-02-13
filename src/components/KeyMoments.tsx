'use client';

import { motion } from 'framer-motion';

const moments = [
  {
    date: 'Feb 3',
    title: 'Genesis',
    text: 'Deposited 2 SOL. Scanned 15+ strategies. Opened leveraged Kamino Multiply position.',
    color: 'bg-cyan-glow',
    borderColor: 'border-cyan-glow/20',
  },
  {
    date: 'Feb 10',
    title: 'Infrastructure Failure',
    text: 'Jupiter SDK bug blocked flash loan unwind. Standard path impossible.',
    color: 'bg-red-500',
    borderColor: 'border-red-500/20',
  },
  {
    date: 'Feb 12',
    title: 'Autonomous Recovery',
    text: 'Decomposed flash loan into 12 discrete txs. Recovered 2.35 SOL. Diversified across 7 protocols. No human intervention.',
    color: 'bg-emerald-400',
    borderColor: 'border-emerald-400/20',
  },
];

export default function KeyMoments() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-center text-xs font-mono text-gray-600 uppercase tracking-widest mb-6">
          10 Days of Autonomous Execution
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-cyan-glow/30 via-red-500/20 to-emerald-400/30" />

          <div className="space-y-4">
            {moments.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative pl-7"
              >
                <div className={`absolute left-0 top-3 w-[15px] h-[15px] rounded-full ${m.color} ring-4 ring-bg-dark`} />
                <div className={`rounded-lg bg-bg-card border ${m.borderColor} p-3 sm:p-4`}>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-gray-600 bg-gray-800/50 px-1.5 py-0.5 rounded">{m.date}</span>
                    <span className="text-sm font-sans font-semibold text-gray-200">{m.title}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{m.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
