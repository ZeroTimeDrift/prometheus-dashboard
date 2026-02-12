'use client';

import { motion } from 'framer-motion';

const timeline = [
  {
    date: 'Feb 3',
    title: 'Genesis',
    description: 'Agent initialized with 2 SOL. Scanned Kamino KLend, Jupiter, Marinade, JitoSOL. Evaluated 15+ yield strategies.',
    type: 'action' as const,
  },
  {
    date: 'Feb 3',
    title: 'First Position: Kamino Multiply',
    description: 'Opened leveraged pSOL/SOL 1.5x Multiply position on Kamino. Logged decision on-chain via Memo program with risk score and reasoning.',
    type: 'action' as const,
  },
  {
    date: 'Feb 4-9',
    title: 'Yield Accrual',
    description: 'Monitored position health factor, tracked yield vs alternatives. Portfolio grew from ◎2.00 to ◎2.05 via staking rewards.',
    type: 'monitor' as const,
  },
  {
    date: 'Feb 10',
    title: '⚠️ Flash Loan Bug',
    description: 'Decided to unwind Multiply position for diversification. Standard flash loan path failed — Jupiter SDK LUT writability bug made transactions too large for CPI.',
    type: 'problem' as const,
  },
  {
    date: 'Feb 12',
    title: 'Autonomous Problem-Solving',
    description: 'Agent identified the failure mode: Jupiter lookup tables marked as writable in CPI context. Decomposed the flash loan into 12 discrete transactions: withdraw collateral → swap pSOL→SOL via Jupiter → repay debt → repeat. Recovered 2.35 SOL. No human intervention.',
    type: 'solve' as const,
  },
  {
    date: 'Feb 12',
    title: 'Multi-Protocol Diversification',
    description: 'Redeployed capital across 7 protocols: Kamino KLend (SOL + USDC + JitoSOL supply), Jupiter swaps, Marinade mSOL, JitoSOL staking, and a DeFi index (JUP, RAY, PYTH, ORCA, WIF, BONK).',
    type: 'action' as const,
  },
  {
    date: 'Feb 12',
    title: 'Capital Efficiency: Borrow Loop',
    description: 'Supplied SOL as collateral on KLend, borrowed USDC, deployed borrowed USDC back into KLend supply — earning yield on both sides of the position.',
    type: 'action' as const,
  },
  {
    date: 'Feb 12',
    title: 'Final State',
    description: '◎2.17 SOL-equivalent across 10+ assets, 7 protocols. 40+ transactions executed. 15+ decision memos on-chain. Every action verifiable on Solscan.',
    type: 'result' as const,
  },
];

const typeStyles = {
  action: { dot: 'bg-cyan-glow', border: 'border-cyan-glow/20' },
  monitor: { dot: 'bg-gray-500', border: 'border-gray-700/30' },
  problem: { dot: 'bg-red-500', border: 'border-red-500/20' },
  solve: { dot: 'bg-emerald-400', border: 'border-emerald-400/20' },
  result: { dot: 'bg-amber-400', border: 'border-amber-400/20' },
};

export default function CaseStudy() {
  return (
    <section className="px-6 py-8" id="case-study">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-sans font-bold text-gray-100 flex items-center gap-3">
            <span className="text-cyan-glow/60">◆</span>
            Case Study: 10 Days of Autonomous Execution
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-2xl">
            From genesis to multi-protocol diversification — how an autonomous agent managed real capital, 
            hit a real bug, and solved it without human intervention.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-4 bottom-4 w-px bg-gradient-to-b from-cyan-glow/30 via-gray-700/30 to-amber-400/30" />

          <div className="space-y-1">
            {timeline.map((event, i) => {
              const style = typeStyles[event.type];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative pl-8 py-3"
                >
                  {/* Dot */}
                  <div className={`absolute left-0 top-[18px] w-[15px] h-[15px] rounded-full ${style.dot} ring-4 ring-bg-dark`} />

                  <div className={`rounded-lg bg-bg-card border ${style.border} p-4`}>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-mono text-gray-500 bg-gray-800/50 px-2 py-0.5 rounded">
                        {event.date}
                      </span>
                      <h3 className="text-sm font-sans font-semibold text-gray-200">
                        {event.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Key insight box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 rounded-xl bg-gradient-to-r from-cyan-glow/5 to-amber-glow/5 border border-cyan-glow/10 p-6"
        >
          <h3 className="text-sm font-sans font-semibold text-cyan-glow mb-2">
            Why This Matters
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Every other yield optimizer in DeFi is <span className="text-gray-200">automated</span> — 
            they execute predefined strategies within single protocols. Prometheus is <span className="text-gray-200">autonomous</span> — 
            it reasons across protocols, adapts when infrastructure fails, and logs its decisions on-chain. 
            Internet capital markets run 24/7. They need agents that think, not vaults that execute.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
