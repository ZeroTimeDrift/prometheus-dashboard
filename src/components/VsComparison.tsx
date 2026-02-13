'use client';

import { motion } from 'framer-motion';

const columns = [
  {
    label: 'Rules-Based',
    sublabel: 'Kamino · Lulo · Beefy',
    tag: 'Fast but rigid',
    items: [
      'Executes predefined logic',
      'Single protocol scope',
      'Breaks when infra fails',
      'Can\'t reason about exits',
    ],
    color: 'text-gray-500',
    border: 'border-gray-800/30',
    bg: '',
    marker: '✗',
    markerColor: 'text-red-500/40',
  },
  {
    label: 'Agentic',
    sublabel: 'Prometheus',
    tag: 'Fast + smart + scales',
    items: [
      'Reasons across 7 protocols',
      'Composes novel strategies',
      'Adapts when things break',
      'Decides with human judgment',
    ],
    color: 'text-cyan-glow',
    border: 'border-cyan-glow/20',
    bg: 'bg-cyan-glow/[0.03]',
    marker: '◆',
    markerColor: 'text-cyan-glow/70',
    highlight: true,
  },
  {
    label: 'Human',
    sublabel: 'Portfolio managers',
    tag: 'Smart but slow',
    items: [
      'Exercises judgment',
      'Can\'t monitor 24/7',
      'Reacts in hours, not seconds',
      'Doesn\'t scale to 1000 positions',
    ],
    color: 'text-gray-500',
    border: 'border-gray-800/30',
    bg: '',
    marker: '✗',
    markerColor: 'text-red-500/40',
  },
];

export default function VsComparison() {
  return (
    <section className="px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto text-center"
      >
        <h2 className="text-2xl md:text-4xl font-sans font-bold text-gray-100 leading-snug mb-3">
          The missing layer in DeFi
        </h2>
        <p className="text-base md:text-lg text-gray-500 mb-10 max-w-xl mx-auto">
          Protocols are fast but rigid. Humans are smart but slow. Capital needs a layer that&apos;s both.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          {columns.map((col, ci) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.1 }}
              className={`rounded-xl ${col.bg} border ${col.border} p-6 md:p-8 ${col.highlight ? 'ring-1 ring-cyan-glow/10 relative' : ''}`}
            >
              {col.highlight && (
                <motion.div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-glow/10 border border-cyan-glow/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <span className="text-[9px] font-mono text-cyan-glow uppercase tracking-wider">The layer in between</span>
                </motion.div>
              )}

              <div className={`text-sm md:text-base font-mono ${col.color} uppercase tracking-widest mb-1 font-bold`}>
                {col.label}
              </div>
              <div className="text-xs font-mono text-gray-600 mb-4">{col.sublabel}</div>

              <div className="space-y-2.5 mb-4">
                {col.items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: col.highlight ? 0 : (ci === 0 ? -8 : 8) }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: ci * 0.1 + i * 0.06 }}
                    className="flex items-start gap-2"
                  >
                    <span className={`${col.markerColor} text-xs mt-0.5 shrink-0`}>{col.marker}</span>
                    <span className={`text-sm ${col.highlight ? 'text-gray-200' : 'text-gray-500'}`}>{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-800/30">
                <span className={`text-[10px] font-mono ${col.color} uppercase`}>{col.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
