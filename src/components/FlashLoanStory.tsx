'use client';

import { motion } from 'framer-motion';

const steps = [
  { num: 1, text: 'Agent decides to unwind leveraged pSOL/SOL Multiply position for diversification', status: 'decision' },
  { num: 2, text: 'Attempts standard flash loan unwind via Kamino SDK', status: 'action' },
  { num: 3, text: 'Jupiter SDK returns LUT writability error — transactions too large for CPI context', status: 'error' },
  { num: 4, text: 'Agent identifies failure mode: lookup tables marked writable in cross-program invocation', status: 'analysis' },
  { num: 5, text: 'Decomposes flash loan into discrete steps: withdraw collateral → swap pSOL→SOL → repay debt', status: 'solution' },
  { num: 6, text: 'Executes 12 transactions sequentially, recovering 2.35 SOL from the position', status: 'execution' },
  { num: 7, text: 'Redeploys recovered capital across 7 protocols — KLend, Jupiter, Jito, Marinade, DeFi index', status: 'execution' },
];

const statusConfig = {
  decision: { color: 'text-cyan-glow', bg: 'bg-cyan-glow/10', ring: 'ring-cyan-glow/30' },
  action: { color: 'text-gray-400', bg: 'bg-gray-500/10', ring: 'ring-gray-500/30' },
  error: { color: 'text-red-400', bg: 'bg-red-500/10', ring: 'ring-red-500/30' },
  analysis: { color: 'text-amber-400', bg: 'bg-amber-500/10', ring: 'ring-amber-500/30' },
  solution: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', ring: 'ring-emerald-500/30' },
  execution: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', ring: 'ring-emerald-500/30' },
};

export default function FlashLoanStory() {
  return (
    <section className="px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl md:text-2xl font-sans font-bold text-gray-100">
              Autonomous Problem-Solving
            </h2>
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Feb 12, 2026</span>
          </div>
          <p className="text-sm md:text-base text-gray-500">
            When infrastructure failed, the agent adapted. No human intervention. No predefined fallback. 
            This is what separates an <span className="text-gray-300">agentic layer</span> from a <span className="text-gray-300">rules-based vault</span>.
          </p>
        </div>

        <div className="space-y-3">
          {steps.map((step, i) => {
            const cfg = statusConfig[step.status as keyof typeof statusConfig];
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className={`flex items-start gap-4 p-4 rounded-lg ${cfg.bg} border border-transparent hover:border-gray-800/30 transition-colors`}
              >
                <div className={`shrink-0 w-8 h-8 rounded-full ${cfg.bg} ring-1 ${cfg.ring} flex items-center justify-center`}>
                  <span className={`text-sm font-mono font-bold ${cfg.color}`}>{step.num}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm md:text-base ${step.status === 'error' ? 'text-red-300' : step.status === 'solution' || step.status === 'execution' ? 'text-gray-200' : 'text-gray-400'} leading-relaxed`}>
                    {step.text}
                  </p>
                </div>
                <span className={`text-[10px] font-mono ${cfg.color} uppercase tracking-wider shrink-0 hidden sm:block`}>
                  {step.status}
                </span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-6 p-4 rounded-lg bg-emerald-500/[0.05] border border-emerald-500/10"
        >
          <p className="text-sm text-gray-400">
            <span className="text-emerald-400 font-semibold">Result:</span> 2.35 SOL recovered and redeployed across 7 protocols in 12 transactions.
            A rules-based vault would have stopped at step 3. A human wouldn&apos;t have been awake.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
