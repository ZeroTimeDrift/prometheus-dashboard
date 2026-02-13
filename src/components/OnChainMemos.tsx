'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const WALLET = '7u5ovFNms7oE232TTyMU5TxDfyZTJctihH4YqP2n1EUz';
const MEMO_PROGRAM = 'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr';
const RPC = 'https://mainnet.helius-rpc.com/?api-key=726a9138-ef71-4b59-a820-ca2478c2b20a';

interface MemoEntry {
  sig: string;
  time: string;
  action: string;
  reasoning: string;
  risk_score?: number;
  confidence?: number;
  portfolio_sol?: number;
  cycle?: string;
  raw?: string;
}

async function fetchMemos(): Promise<MemoEntry[]> {
  // Get recent signatures
  const sigRes = await fetch(RPC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0', id: 1,
      method: 'getSignaturesForAddress',
      params: [WALLET, { limit: 100 }]
    })
  });
  const sigData = await sigRes.json();
  const sigs = sigData.result || [];

  const memos: MemoEntry[] = [];

  // Fetch each tx and check for memo instructions
  for (const s of sigs) {
    try {
      const txRes = await fetch(RPC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0', id: 1,
          method: 'getTransaction',
          params: [s.signature, { encoding: 'jsonParsed', maxSupportedTransactionVersion: 0 }]
        })
      });
      const txData = await txRes.json();
      const tx = txData.result;
      if (!tx) continue;

      const instructions = tx.transaction?.message?.instructions || [];
      for (const ix of instructions) {
        if (ix.programId === MEMO_PROGRAM && ix.parsed) {
          const raw = typeof ix.parsed === 'string' ? ix.parsed : JSON.stringify(ix.parsed);
          try {
            const parsed = JSON.parse(raw);
            if (parsed.agent === 'prometheus') {
              memos.push({
                sig: s.signature,
                time: parsed.time || new Date((tx.blockTime || 0) * 1000).toISOString(),
                action: parsed.action || 'UNKNOWN',
                reasoning: parsed.reasoning || raw,
                risk_score: parsed.risk_score,
                confidence: parsed.confidence,
                portfolio_sol: parsed.portfolio_sol,
                cycle: parsed.cycle,
              });
            }
          } catch {
            // Not JSON or not our memo — check if it starts with known patterns
            if (raw.includes('prometheus') || raw.includes('OODA') || raw.includes('Prometheus')) {
              memos.push({
                sig: s.signature,
                time: new Date((tx.blockTime || 0) * 1000).toISOString(),
                action: 'LOG',
                reasoning: raw.slice(0, 300),
                raw,
              });
            }
          }
        }
      }
    } catch {
      continue;
    }
  }

  return memos.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
}

const actionColors: Record<string, string> = {
  HOLD: 'text-gray-400 bg-gray-500/10',
  REBALANCE: 'text-green-400 bg-green-500/10',
  SUPPLY: 'text-green-400 bg-green-500/10',
  BORROW: 'text-amber-400 bg-amber-500/10',
  SWAP: 'text-cyan-400 bg-cyan-500/10',
  WITHDRAW: 'text-red-400 bg-red-500/10',
  DEPLOY: 'text-emerald-400 bg-emerald-500/10',
  LOG: 'text-purple-400 bg-purple-500/10',
  GENESIS: 'text-cyan-400 bg-cyan-500/10',
  UNKNOWN: 'text-gray-400 bg-gray-500/10',
};

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' +
           d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  } catch {
    return iso;
  }
}

export default function OnChainMemos() {
  const [memos, setMemos] = useState<MemoEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMemos()
      .then(m => { setMemos(m); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  return (
    <section className="px-6 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-xl md:text-2xl font-sans font-bold text-gray-100">On-Chain Decision Memos</h2>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-xs font-mono text-purple-400">Fetched live from Solana</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Every decision logged immutably via Memo program — fetched directly from the blockchain right now
        </p>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-3 text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-600 border-t-cyan-glow rounded-full animate-spin" />
            <span className="font-mono text-sm">Fetching memos from Solana mainnet...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="text-center py-8 text-red-400 font-mono text-sm">
          Failed to fetch: {error}
        </div>
      )}

      {!loading && !error && memos.length === 0 && (
        <div className="text-center py-8 text-gray-600 font-mono text-sm">
          No agent memos found on-chain
        </div>
      )}

      <div className="space-y-3">
        {memos.map((m, i) => (
          <motion.div
            key={m.sig}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="rounded-lg bg-bg-card border border-gray-800/30 p-4 md:p-5 hover:border-gray-700/40 transition-colors"
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-mono text-gray-600 bg-gray-800/50 px-2 py-0.5 rounded">
                {formatTime(m.time)}
              </span>
              <span className={`text-xs font-mono px-2 py-0.5 rounded ${actionColors[m.action] || actionColors.UNKNOWN}`}>
                {m.action}
              </span>
              {m.cycle && (
                <span className="text-[10px] font-mono text-gray-600">{m.cycle}</span>
              )}
              <a
                href={`https://solscan.io/tx/${m.sig}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-gray-600 hover:text-cyan-glow transition-colors ml-auto"
              >
                {m.sig.slice(0, 8)}...{m.sig.slice(-4)} ↗
              </a>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{m.reasoning}</p>
            {(m.risk_score !== undefined || m.confidence !== undefined || m.portfolio_sol !== undefined) && (
              <div className="flex gap-4 mt-2">
                {m.portfolio_sol !== undefined && (
                  <span className="text-[10px] font-mono text-gray-600">
                    Portfolio: <span className="text-gray-400">◎ {m.portfolio_sol}</span>
                  </span>
                )}
                {m.risk_score !== undefined && (
                  <span className="text-[10px] font-mono text-gray-600">
                    Risk: <span className={m.risk_score <= 3 ? 'text-green-400' : m.risk_score <= 6 ? 'text-amber-400' : 'text-red-400'}>
                      {m.risk_score}/10
                    </span>
                  </span>
                )}
                {m.confidence !== undefined && (
                  <span className="text-[10px] font-mono text-gray-600">
                    Confidence: <span className="text-gray-400">{m.confidence}%</span>
                  </span>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
