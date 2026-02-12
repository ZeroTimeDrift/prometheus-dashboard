#!/bin/bash
# Refresh dashboard data from on-chain state
# Runs periodically to keep dashboard live

WALLET="7u5ovFNms7oE232TTyMU5TxDfyZTJctihH4YqP2n1EUz"
RPC="https://mainnet.helius-rpc.com/?api-key=726a9138-ef71-4b59-a820-ca2478c2b20a"
DATA_FILE="/root/clawd/hackathon/prometheus-dashboard/src/data/live.json"

# Fetch SOL balance
SOL_BAL=$(curl -s -X POST "$RPC" -H "Content-Type: application/json" \
  -d "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"getBalance\",\"params\":[\"$WALLET\"]}" \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['value'] / 1e9)" 2>/dev/null)

# Fetch token accounts
TOKENS=$(curl -s -X POST "$RPC" -H "Content-Type: application/json" \
  -d "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"getTokenAccountsByOwner\",\"params\":[\"$WALLET\",{\"programId\":\"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA\"},{\"encoding\":\"jsonParsed\"}]}" 2>/dev/null)

# Fetch prices
PRICES=$(curl -s "https://api.coingecko.com/api/v3/simple/price?ids=solana,jupiter-exchange-solana,raydium,pyth-network,dogwifcoin,orca,bonk&vs_currencies=usd" 2>/dev/null)

# Write live data
python3 << PYEOF
import json, sys

sol_bal = float("${SOL_BAL}" or "0")
tokens_raw = '''${TOKENS}'''
prices_raw = '''${PRICES}'''

try:
    prices = json.loads(prices_raw)
except:
    prices = {}

sol_price = prices.get("solana", {}).get("usd", 77)

data = {
    "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "solBalance": sol_bal,
    "solPrice": sol_price,
    "totalValue": 167.26,  # Will be computed properly
}

with open("${DATA_FILE}", "w") as f:
    json.dump(data, f, indent=2)

print(f"Refreshed: SOL={sol_bal:.4f} @ \${sol_price}")
PYEOF
