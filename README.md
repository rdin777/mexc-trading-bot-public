Markdown
# MEXC Trading Signal Bot

This bot monitors the BTC/USDT market on the MEXC exchange in real time, analyzes data using indicators (RSI and EMA), and sends notifications to Telegram when specified conditions are met.

## 🚀 Features
- **Real-time Monitoring:** Receive data from the exchange every 60 seconds.
- **Technical Analysis:** Automatic calculation of RSI (period 14) and EMA (period 20).
- **Smart Notifications:** The bot signals "pullbacks" (buy) and "overbought" conditions (sell), featuring built-in spam protection.
- **Lightweight:** Low resource consumption—ideal for running via `pm2`.

## 🛠 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rdin777/mexc-trading-bot-public
   cd mexc-trading-bot-public
Install dependencies:

Bash
npm install
Configure environment variables:
Create a .env file based on the example:

Bash
cp .env.example .env
Open it using `nano .env` and insert your details:

Plaintext
TELEGRAM_BOT_TOKEN=your_token_from_botfather
TELEGRAM_CHAT_ID=your_chat_id

Launch:

Bash
npx tsx trade-bot.ts
⚙️ Technology Stack
TypeScript

CCXT (Library for interacting with exchange APIs)

technicalindicators

node-telegram-bot-api

💡 Improvement Suggestions
The project is open to Pull Requests! If you have ideas for adding new indicators or supporting other trading pairs, I would be happy to discuss them in the Issues section.

MEXC https://promote.mexc.com/r/UkjrYr22eY

Markdown
## ☕ Support the Project
If this bot has helped you with your trading or saved you time on analysis, you can support the project's development:
- **USDT (ERC20):** 0xBDDD7973D0DE27B715A4A5cbdb87d0DF78757b3A on the Arbitrum network

Any support helps me dedicate more time to adding new features and indicators!
