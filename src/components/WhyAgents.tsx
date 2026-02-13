'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const existingTools = [
  {
    name: 'Lulo',
    type: 'Rate Aggregator',
    does: 'Finds best lending rate across protocols',
    fails: 'Deposits into one protocol and forgets. No cross-strategy reasoning, no exit logic.',
    icon: '🔄',
  },
  {
    name: 'Kamino Vaults',
    type: 'Auto-compounder',
    does: 'Auto-compounds rewards within a single vault strategy',
    fails: 'Can\'t decide to leave a vault when a better opportunity exists elsewhere.',
    icon: '🏦',
  },
  {
    name: 'Beefy / Yearn',
    type: 'Yield Aggregator',
    does: 'Routes deposits to highest-APY vault',
    fails: 'Predefined strategies only. Can\'t compose new positions or adapt to novel conditions.',
    icon: '🐮',
  },
  {
    name: 'Jupiter DCA',
    type: 'Scheduled Swaps',
    does: 'Time-weighted buying on a fixed schedule',
    fails: 'No market awareness. Buys on schedule regardless of conditions.',
    icon: '⏰',
  },
];

const agentCapabilities = [
  {
    label: 'Cross-protocol reasoning',
    description: 'Compares KLend 4.66% vs JitoSOL+KLend 9.2% vs Multiply 8.1%, factors in gas and risk, picks the best',
    icon: '🧠',
    delay: 0,
  },
  {
    label: 'Adaptive execution',
    description: 'When Jupiter SDK broke the flash loan path, decomposed into 12 discrete txs automatically',
    icon: '⚡',
    delay: 0.1,
  },
  {
    label: 'Strategy composition',
    description: 'Supply SOL → borrow USDC → supply USDC → earn yield on both sides. No vault offers this.',
    icon: '🔗',
    delay: 0.2,
  },
  {
    label: 'On-chain reasoning trail',
    description: 'Every decision logged via Memo program with risk score, confidence, and full rationale',
    icon: '📋',
    delay: 0.3,
  },
  {
    label: 'Continuous monitoring',
    description: '24/7 OODA loop — observes rate changes, rebalances within minutes, not days',
    icon: '👁',
    delay: 0.4,
  },
];

export default function WhyAgents() {
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);

  return (
    <section className="px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-sans font-bold text-gray-100 flex items-center gap-3">
            <span className="text-cyan-glow/60">◆</span>
            Why Vaults Aren&apos;t Enough
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-2xl">
            Existing yield tools are <span className="text-gray-300">automated</span> — they execute predefined logic.
            Internet capital markets need tools that are <span className="text-cyan-glow">autonomous</span> — that reason, adapt, and compose.
          </p>
        </div>

        {/* Existing tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {existingTools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onMouseEnter={() => setHoveredTool(i)}
              onMouseLeave={() => setHoveredTool(null)}
              className="relative rounded-lg bg-bg-card border border-gray-800/50 p-4 overflow-hidden cursor-default group"
            >
              {/* Red strikethrough animation on hover */}
              <motion.div
                className="absolute inset-0 bg-red-500/5 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredTool === i ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />

              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{tool.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-sans font-semibold text-gray-200">{tool.name}</span>
                    <span className="text-[10px] font-mono text-gray-600 bg-gray-800/50 px-1.5 py-0.5 rounded">{tool.type}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{tool.does}</p>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: hoveredTool === i ? 'auto' : 0,
                      opacity: hoveredTool === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-start gap-1.5 pt-2 border-t border-red-500/10">
                      <span className="text-red-400 text-xs mt-0.5">✗</span>
                      <p className="text-xs text-red-400/80">{tool.fails}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider with arrow */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-gray-700/50" />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <span className="text-xs font-mono text-gray-600 mb-1">what&apos;s missing</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-cyan-glow text-lg"
            >
              ↓
            </motion.span>
          </motion.div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-700/50 to-gray-700/50" />
        </div>

        {/* Agent capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl bg-gradient-to-b from-cyan-glow/[0.03] to-transparent border border-cyan-glow/10 p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-sans font-semibold text-cyan-glow">Prometheus: Financial Agency</span>
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-glow"
            />
          </div>

          <div className="space-y-3">
            {agentCapabilities.map((cap) => (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: cap.delay + 0.3 }}
                className="flex items-start gap-3 group"
              >
                <span className="text-base mt-0.5 group-hover:scale-110 transition-transform">{cap.icon}</span>
                <div>
                  <span className="text-sm font-sans font-medium text-gray-200">{cap.label}</span>
                  <p className="text-xs text-gray-500 mt-0.5">{cap.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-sm text-gray-600 mt-6 font-sans italic"
        >
          Automated ≠ Autonomous. Vaults execute. Agents think.
        </motion.p>
      </motion.div>
    </section>
  );
}
