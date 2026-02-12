export const WALLET_ADDRESS = '7u5ovFNms7oE232TTyMU5TxDfyZTJctihH4YqP2n1EUz';

export const portfolioStats = {
  totalValue: 2.17,
  totalValueUsd: 167.26,
  currentAPY: 5.8,
  activeStrategy: 'Diversified: Yield + LSTs + DeFi Index',
  totalTransactions: 42,
  successfulTransactions: 40,
  daysActive: 10,
  solBalance: 0.51,
};

export const oodaSteps = [
  {
    id: 'observe',
    label: 'OBSERVE',
    description: 'Scan on-chain rates across Kamino, Marinade, Jito, and lending protocols every 2 hours',
    icon: '👁',
    active: false,
  },
  {
    id: 'orient',
    label: 'ORIENT',
    description: 'Analyze rate differentials, gas costs, position health, and risk exposure',
    icon: '🧭',
    active: false,
  },
  {
    id: 'decide',
    label: 'DECIDE',
    description: 'Compare expected yield vs transaction cost; determine optimal position adjustment',
    icon: '⚡',
    active: false,
  },
  {
    id: 'act',
    label: 'ACT',
    description: 'Execute rebalance: unwind, swap, or open positions via Kamino SDK + Jupiter',
    icon: '🎯',
    active: true,
  },
];

export const performanceData = [
  { date: 'Feb 3', value: 2.00, label: 'Initial 2 SOL deposit' },
  { date: 'Feb 4', value: 2.00, label: 'Multiply position opened' },
  { date: 'Feb 5', value: 2.01, label: 'Yield accrual' },
  { date: 'Feb 6', value: 2.01, label: '' },
  { date: 'Feb 7', value: 2.02, label: '' },
  { date: 'Feb 8', value: 2.03, label: 'Staking yield' },
  { date: 'Feb 9', value: 2.04, label: '' },
  { date: 'Feb 10', value: 2.04, label: 'Flash loan bug hit' },
  { date: 'Feb 11', value: 2.05, label: '' },
  { date: 'Feb 12', value: 2.17, label: 'Unwound + diversified across 7 protocols' },
];

export const decisions = [
  {
    time: 'Feb 12, 21:30',
    action: 'Built Solana DeFi Index — 5 swaps',
    reasoning: 'Allocated across blue-chip DeFi: JUP (Jupiter DEX governance), RAY (Raydium AMM), PYTH (oracle infra), ORCA (concentrated liquidity), WIF (cultural). Each position sized 0.05-0.1 SOL.',
    status: 'success' as const,
    txHash: 'W1UuFtW3...yu91 (+ 4 more)',
  },
  {
    time: 'Feb 12, 21:28',
    action: 'Borrowed 5 USDC against SOL collateral',
    reasoning: 'Borrow USDC at 5.16% against SOL deposit. Capital-efficient — using deposited collateral to access more capital for deployment.',
    status: 'success' as const,
    txHash: '4bHzP1NK...EwyJ',
  },
  {
    time: 'Feb 12, 21:28',
    action: 'Meme allocation: 5 USDC → 834,916 BONK',
    reasoning: 'Tactical 2.5% portfolio in BONK. High-risk/high-reward satellite. Agent demonstrating range across asset classes. Risk: 80/100.',
    status: 'success' as const,
    txHash: '8f6vjpPD...eTh',
  },
  {
    time: 'Feb 12, 21:27',
    action: 'Supplied 0.3 more SOL to KLend',
    reasoning: 'Increase KLend SOL supply to 0.8 total. Strengthens collateral base for USDC borrow. Risk: 10/100.',
    status: 'success' as const,
    txHash: '5QZZggBE...6nu1',
  },
  {
    time: 'Feb 12, 21:27',
    action: 'Diversified 0.15 SOL → mSOL (Marinade)',
    reasoning: 'Marinade mSOL for staking diversification (~6.8% APY). Multiple LST providers = lower validator concentration risk.',
    status: 'success' as const,
    txHash: '5m3raD3r...6Ew9',
  },
  {
    time: 'Feb 12, 21:20',
    action: 'Portfolio snapshot logged on-chain',
    reasoning: 'Diversified portfolio: 0.5 SOL in KLend (4.66%), JitoSOL staking (~7-8%), USDC hedge (3.39%). All positions and reasoning logged immutably via Memo program.',
    status: 'success' as const,
    txHash: 't3q6CGXn...C8ND',
  },
  {
    time: 'Feb 12, 21:19',
    action: 'Hedged 0.2 SOL → 15.4 USDC → KLend',
    reasoning: 'Stablecoin allocation reduces portfolio volatility. USDC earning 3.39% on KLend. Risk: 5/100.',
    status: 'success' as const,
    txHash: '4DWFgyJB...hCEY',
  },
  {
    time: 'Feb 12, 21:18',
    action: 'Diversified 0.3 SOL → 0.24 JitoSOL → KLend',
    reasoning: 'Stack yields: JitoSOL staking (~7%) + KLend supply APY. Double yield on same capital. Risk: 12/100.',
    status: 'success' as const,
    txHash: '3885Zw1i...CMkV',
  },
  {
    time: 'Feb 12, 21:17',
    action: 'Manifesto written on-chain',
    reasoning: '"I am Prometheus. An autonomous agent managing real capital on Solana. Every decision logged. Every tx verifiable. This is what agent-native DeFi looks like."',
    status: 'success' as const,
    txHash: 'kHuC31aw...LaVP',
  },
  {
    time: 'Feb 12, 21:15',
    action: 'Supplied 0.5 SOL to KLend at 4.66% APY',
    reasoning: 'Post-unwind redeployment. SOL KLend at 4.66% APY, low risk. Deploy 21% of portfolio, keep 79% liquid for further operations.',
    status: 'success' as const,
    txHash: '5cuTgL6V...ypq5',
  },
  {
    time: 'Feb 12, 21:05',
    action: 'Autonomous position unwind — 12+ transactions',
    reasoning: 'Flash loan unwind blocked by Jupiter LUT writability bug. Decomposed into discrete steps: withdraw pSOL → Jupiter swap → repay SOL borrow → repeat. Recovered 2.35 SOL across 6 rounds of withdraw/swap/repay.',
    status: 'success' as const,
    txHash: '4VteErm...mnoB (first of 12)',
  },
  {
    time: 'Feb 10, 16:30',
    action: 'Rebalance blocked — Jupiter LUT bug diagnosed',
    reasoning: 'Attempted programmatic multiply unwind via flash loan. Jupiter marks pool account Cz4cm3c1 as writable but LUT compression loses the flag during CPI. Root cause identified, workaround planned.',
    status: 'failed' as const,
    txHash: null,
  },
  {
    time: 'Feb 5, 12:00',
    action: 'Health check — position stable',
    reasoning: 'LTV at 33.5%, well within safe range. pSOL/SOL spread still positive. No action needed.',
    status: 'success' as const,
    txHash: null,
  },
  {
    time: 'Feb 3, 15:00',
    action: 'Opened pSOL/SOL 1.5x Multiply position',
    reasoning: 'pSOL staking yield spread over SOL borrow cost. Net positive carry trade with 1.5x leverage. Risk: 35/100.',
    status: 'success' as const,
    txHash: 'on-chain (Kamino)',
  },
  {
    time: 'Feb 3, 14:00',
    action: 'Initial 2.0 SOL deposit to Kamino KLend',
    reasoning: 'Bootstrap vault with initial capital. Deploy to Kamino KLend main market for base yield while evaluating strategies.',
    status: 'success' as const,
    txHash: 'on-chain',
  },
];

export const protocolRates = [
  {
    protocol: 'Kamino KLend',
    asset: 'SOL Supply',
    apy: 4.66,
    active: true,
    risk: 'Low',
  },
  {
    protocol: 'JitoSOL + KLend',
    asset: 'JitoSOL (stacked)',
    apy: 9.2,
    active: true,
    risk: 'Low',
  },
  {
    protocol: 'Kamino KLend',
    asset: 'USDC Supply',
    apy: 3.39,
    active: true,
    risk: 'Very Low',
  },
  {
    protocol: 'DeFi Index',
    asset: 'JUP / RAY / PYTH / ORCA',
    apy: 0,
    active: true,
    risk: 'Medium',
  },
  {
    protocol: 'Kamino KLend',
    asset: 'USD1 Supply',
    apy: 24.9,
    active: false,
    risk: 'Medium',
  },
  {
    protocol: 'Marinade',
    asset: 'mSOL Staking',
    apy: 6.8,
    active: true,
    risk: 'Low',
  },
];

export const riskParameters = [
  { label: 'Max Single Position', value: '50%', description: 'Maximum portfolio allocation to one position' },
  { label: 'Max Leverage', value: '3.0x', description: 'Maximum leverage on any multiply position' },
  { label: 'Max Slippage', value: '1.5%', description: 'Maximum acceptable slippage per swap' },
  { label: 'Circuit Breaker', value: '5% daily loss', description: 'Halt all trading if daily loss exceeds threshold' },
  { label: 'Gas Reserve', value: '0.05 SOL', description: 'Minimum SOL reserved for emergency exits' },
  { label: 'Rebalance Cooldown', value: '2 hours', description: 'Minimum time between position changes' },
];
