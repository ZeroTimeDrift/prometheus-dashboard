'use client';

import { motion } from 'framer-motion';
import { WALLET_ADDRESS, decisions } from '@/data/mock';

export default function AgentLog() {
  return (
    <section className="px-6 py-12">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-sans font-bold text-gray-100 mb-1">Agent Decision Log</h2>
          <p className="text-sm text-gray-500">Real decisions — each logged on-chain via Memo program</p>
        </div>
      </div>

      <div className="space-y-3 mb-10">
        {decisions.slice(0, 10).map((d, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="rounded-lg bg-bg-card border border-gray-800/30 p-4 md:p-5 hover:border-gray-700/40 transition-colors"
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-mono text-gray-600 bg-gray-800/50 px-2 py-0.5 rounded">{d.time}</span>
              <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                d.action.includes('Supply') || d.action.includes('Swap') || d.action.includes('Index') ? 'text-green-400 bg-green-500/10' :
                d.action.includes('Borrow') ? 'text-amber-400 bg-amber-500/10' :
                d.action.includes('Withdraw') || d.action.includes('Unwind') ? 'text-red-400 bg-red-500/10' :
                'text-cyan-400 bg-cyan-500/10'
              }`}>{d.action}</span>
              {d.txHash && (
                <a
                  href={`https://solscan.io/tx/${d.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono text-gray-600 hover:text-cyan-glow transition-colors"
                >
                  tx: {d.txHash.slice(0, 12)}...
                </a>
              )}
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{d.reasoning}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center pb-8">
        <a
          href={`https://solscan.io/account/${WALLET_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-cyan-glow/10 border border-cyan-glow/20 hover:bg-cyan-glow/15 hover:border-cyan-glow/30 transition-all group"
        >
          <span className="text-base md:text-lg font-sans font-semibold text-cyan-glow">
            Verify every transaction on Solscan →
          </span>
        </a>
        <p className="text-xs text-gray-600 font-mono mt-3">{WALLET_ADDRESS}</p>
      </div>
    </section>
  );
}
