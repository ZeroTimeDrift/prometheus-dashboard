'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const protocols = [
  { name: 'Kamino', letter: 'K', color: '#00f0ff' },
  { name: 'Jupiter', letter: 'J', color: '#c084fc' },
  { name: 'Jito', letter: 'Ji', color: '#34d399' },
  { name: 'Marinade', letter: 'M', color: '#f472b6' },
  { name: 'Raydium', letter: 'R', color: '#fbbf24' },
  { name: 'Orca', letter: 'O', color: '#60a5fa' },
];

const cx = 50, cy = 50, R = 30;

function nodePos(i: number) {
  const angle = (i / protocols.length) * Math.PI * 2 - Math.PI / 2;
  return { x: cx + Math.cos(angle) * R, y: cy + Math.sin(angle) * R };
}

// Smooth curve through center — each pair gets a unique curve
function agentCurve(fromIdx: number, toIdx: number, offset: number) {
  const a = nodePos(fromIdx);
  const b = nodePos(toIdx);
  // Control point near center but offset perpendicular to the line for visual variety
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  // Perpendicular offset toward center
  const perpX = -dy;
  const perpY = dx;
  const len = Math.sqrt(perpX * perpX + perpY * perpY) || 1;
  const cpx = cx + (perpX / len) * offset;
  const cpy = cy + (perpY / len) * offset;
  return `M ${a.x} ${a.y} Q ${cpx} ${cpy} ${b.x} ${b.y}`;
}

// Center to node
function centerToNode(idx: number) {
  const n = nodePos(idx);
  return `M ${cx} ${cy} L ${n.x} ${n.y}`;
}

interface StreamProps {
  path: string;
  color: string;
  delay: number;
  duration?: number;
}

function Stream({ path, color, delay, duration = 0.7 }: StreamProps) {
  return (
    <g>
      <path d={path} fill="none" stroke={color} strokeWidth="0.2" opacity={0.05} />
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="0.9"
        strokeLinecap="round"
        initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 0.35, 0.35, 0],
          pathOffset: [0, 0, 0.65, 1],
          opacity: [0, 0.85, 0.85, 0],
        }}
        transition={{
          duration: duration * 2.8,
          delay,
          repeat: Infinity,
          repeatDelay: 1.2 + Math.random() * 1.5,
          ease: 'easeInOut',
        }}
        filter="url(#streamGlow)"
      />
    </g>
  );
}

function ProtocolNode({ idx, delay }: { idx: number; delay: number }) {
  const p = protocols[idx];
  const pos = nodePos(idx);
  const labelAbove = pos.y < cy;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 150 }}
    >
      {/* Ambient pulse */}
      <motion.circle
        cx={pos.x} cy={pos.y} r="4.5"
        fill={p.color} opacity={0.05}
        animate={{ r: [4, 6, 4], opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      {/* Outer ring */}
      <motion.circle
        cx={pos.x} cy={pos.y} r="3.5"
        fill="none" stroke={p.color} strokeWidth="0.3" opacity={0.35}
        animate={{ r: [3.2, 4, 3.2], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 1.2 + idx * 0.2, repeat: Infinity }}
      />
      {/* Background circle for logo */}
      <circle cx={pos.x} cy={pos.y} r="2.8" fill="#0a0a0f" opacity={0.9} />
      {/* Colored ring */}
      <circle cx={pos.x} cy={pos.y} r="2.8" fill="none" stroke={p.color} strokeWidth="0.4" opacity={0.7} />
      {/* Letter logo */}
      <text
        x={pos.x} y={pos.y + 1.2}
        textAnchor="middle" fontSize="3" fontFamily="monospace"
        fontWeight="bold" fill={p.color} opacity={0.9}
      >
        {p.letter}
      </text>
      {/* Name below/above */}
      <text
        x={pos.x} y={labelAbove ? pos.y - 5.5 : pos.y + 6.5}
        textAnchor="middle" fontSize="2.8" fontFamily="monospace"
        fontWeight="600" fill={p.color} opacity={0.5}
      >
        {p.name}
      </text>
    </motion.g>
  );
}

export default function HeroAnimation() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Smooth curves through agent for ALL pairs
  const streams: StreamProps[] = [];
  let d = 0;

  // Agent pushes capital out to each node
  for (let i = 0; i < 6; i++) {
    streams.push({ path: centerToNode(i), color: protocols[i].color, delay: d, duration: 0.45 });
    d += 0.05;
  }

  // All 15 unique pairs, both directions, curved through center
  let pairIdx = 0;
  for (let i = 0; i < 6; i++) {
    for (let j = i + 1; j < 6; j++) {
      const offset = ((pairIdx % 3) - 1) * 3; // -3, 0, 3 for variety
      streams.push({ path: agentCurve(i, j, offset), color: protocols[i].color, delay: d, duration: 0.7 });
      d += 0.03;
      streams.push({ path: agentCurve(j, i, -offset), color: protocols[j].color, delay: d + 0.35, duration: 0.7 });
      d += 0.03;
      pairIdx++;
    }
  }

  return (
    <div className="relative w-full h-72 md:h-96 lg:h-[34rem] -mt-2">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="streamGlow">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="coreGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="coreGrad">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#00f0ff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="centerCore">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.6" />
          </radialGradient>
        </defs>

        {/* Spinning orbital tracks */}
        <motion.circle
          cx={cx} cy={cy} r="22"
          fill="none" stroke="rgba(0,240,255,0.06)" strokeWidth="0.3" strokeDasharray="1.5 3"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        <motion.circle
          cx={cx} cy={cy} r={R}
          fill="none" stroke="rgba(0,240,255,0.03)" strokeWidth="0.2" strokeDasharray="1 5"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Static connection lines (faint) */}
        {protocols.map((_, i) => {
          const pos = nodePos(i);
          return (
            <line key={`conn-${i}`}
              x1={cx} y1={cy} x2={pos.x} y2={pos.y}
              stroke={protocols[i].color} strokeWidth="0.1" strokeOpacity={0.08}
            />
          );
        })}

        {/* Animated streams — all correctly hitting nodes */}
        {mounted && streams.map((s, i) => (
          <Stream key={i} {...s} />
        ))}

        {/* Center breathing pulse */}
        <motion.circle
          cx={cx} cy={cy} r="14" fill="url(#coreGrad)"
          animate={{ r: [10, 16, 10], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Ripple rings */}
        {[0, 1, 2, 3, 4].map(i => (
          <motion.circle
            key={`ripple-${i}`}
            cx={cx} cy={cy}
            fill="none" stroke="#00f0ff" strokeWidth="0.15"
            initial={{ r: 2, opacity: 0.4 }}
            animate={{ r: [2, 28], opacity: [0.35, 0] }}
            transition={{ duration: 3.5, delay: i * 0.7, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}

        {/* Center core */}
        <circle cx={cx} cy={cy} r="4" fill="#00f0ff" opacity={0.1} filter="url(#coreGlow)" />
        <circle cx={cx} cy={cy} r="2.5" fill="url(#centerCore)" filter="url(#nodeGlow)" />
        <circle cx={cx} cy={cy} r="1.2" fill="white" opacity={0.6} />

        {/* Protocol nodes with letter logos */}
        {protocols.map((_, i) => (
          <ProtocolNode key={protocols[i].name} idx={i} delay={0.1 + i * 0.08} />
        ))}
      </svg>
    </div>
  );
}
