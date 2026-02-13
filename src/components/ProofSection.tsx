'use client';

import { motion } from 'framer-motion';
import { WALLET_ADDRESS } from '@/data/mock';

const features = [
  {
    icon: '🧠',
    title: 'Cross-Protocol Reasoning',
    desc: 'Compares yields across Kamino, Jupiter, Jito, Marinade simultaneously. Factors in gas, slippage, and risk before every move.',
  },
  {
    icon: '⚡',
    title: 'Adaptive Execution',
    desc: 'When Jupiter SDK broke the flash loan path, the agent decomposed it into 12 discrete transactions autonomously. No human. No predefined fallback.',
  },
  {
    icon: '🔗',
    title: 'Strategy Composition',
    desc: 'Supply SOL → borrow USDC → supply USDC → earn on both sides. Builds novel strategies no single vault offers.',
  },
  {
    icon: '📋',
    title: 'On-Chain Decision Trail',
    desc: 'Every decision logged to Solana via Memo program with full JSON reasoning — action, risk score, confidence, rationale. Fully auditable.',
  },
  {
    icon: '🛡️',
    title: 'Rules-Based Safety',
    desc: 'Hard constraints: max position exposure, slippage caps, daily loss circuit breaker, minimum gas reserve. The agent reasons within guardrails.',
  },
  {
    icon: '🔄',
    title: 'Continuous OODA Loop',
    desc: 'Observe rates → Orient risk → Decide action → Act on-chain. Every 2 hours, 24/7. The market never sleeps. Neither does the agent.',
  },
];

const timeline = [
  { date: 'Feb 3', event: 'Genesis — 2 SOL deposited, 15+ strategies scanned, Kamino Multiply opened', color: 'bg-cyan-glow' },
  { date: 'Feb 10', event: 'Jupiter SDK bug blocks flash loan unwind — standard path impossible', color: 'bg-red-500' },
  { date: 'Feb 12', event: 'Agent decomposes into 12 txs, recovers 2.35 SOL, diversifies across 7 protocols', color: 'bg-emerald-400' },
];

export default function ProofSection() {
  return (
    <section className="px-6 py-16">
      {/* Feature cards */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-4xl font-sans font-bold text-gray-100 text-center mb-4">
          What the agentic layer does
        </h2>
        <p className="text-base md:text-lg text-gray-500 text-center mb-12 max-w-2xl mx-auto">
          Not a vault. Not a dashboard. A decision engine that reasons, adapts, and executes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-xl bg-bg-card border border-gray-800/40 p-6 md:p-8 hover:border-gray-700/60 transition-colors"
            >
              <span className="text-2xl mb-4 block">{f.icon}</span>
              <h3 className="text-base md:text-lg font-sans font-semibold text-gray-100 mb-2">{f.title}</h3>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* The proof — timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-2xl md:text-4xl font-sans font-bold text-gray-100 text-center mb-4">
          The proof is on-chain
        </h2>
        <p className="text-base md:text-lg text-gray-500 text-center mb-12 max-w-xl mx-auto">
          10 days. 40+ transactions. Real capital. Every action verifiable.
        </p>

        <div className="relative mb-12">
          <div className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-cyan-glow/30 via-red-500/20 to-emerald-400/30" />
          <div className="space-y-5">
            {timeline.map((t, i) => (
              <motion.div
                key={t.date}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative pl-8"
              >
                <div className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full ${t.color} ring-4 ring-bg-dark`} />
                <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                  <span className="text-xs font-mono text-gray-600 bg-gray-800/50 px-2 py-1 rounded shrink-0 w-fit">{t.date}</span>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">{t.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA — Verify on Solscan */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center"
        >
          <a
            href={`https://solscan.io/account/${WALLET_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-cyan-glow/10 border border-cyan-glow/20 hover:bg-cyan-glow/15 hover:border-cyan-glow/30 transition-all group"
          >
            <span className="text-base md:text-lg font-sans font-semibold text-cyan-glow">
              Verify every transaction on Solscan
            </span>
            <svg className="w-5 h-5 text-cyan-glow/60 group-hover:text-cyan-glow transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <p className="text-xs text-gray-600 font-mono mt-3">{WALLET_ADDRESS}</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
