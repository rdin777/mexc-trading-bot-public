import ccxt from 'ccxt';
import { RSI, EMA } from 'technicalindicators';
import * as dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();

const publicClient = new ccxt.mexc({ enableRateLimit: true });
const tgBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: false });

// ФЛАГИ ДЛЯ ЗАЩИТЫ ОТ СПАМА
let notifiedRsiOver70 = false;
let notifiedRsiUnder40 = false;

async function sendTg(message: string) {
    try {
        await tgBot.sendMessage(process.env.TELEGRAM_CHAT_ID!, message);
    } catch (e) {
        console.error("Ошибка Telegram:", e);
    }
}

async function trade() {
    try {
        const symbol = 'BTC/USDT';
        const ohlcv = await publicClient.fetchOHLCV(symbol, '15m', undefined, 50);
        const closes = ohlcv.map(c => c[4] as number);
        
        const rsi = RSI.calculate({ values: closes, period: 14 });
        const ema = EMA.calculate({ values: closes, period: 20 });
        
        const currentRsi = rsi[rsi.length - 1];
        const currentPrice = closes[closes.length - 1];
        const currentEma = ema[ema.length - 1];
        
        console.log(`BTC: ${currentPrice} | RSI: ${currentRsi.toFixed(2)} | EMA20: ${currentEma.toFixed(2)}`);

        // Логика с проверкой флагов
        if (currentRsi < 40 && currentPrice > currentEma) {
            if (!notifiedRsiUnder40) {
                const msg = `🚀 СИГНАЛ: Откат в тренде.\nЦена: ${currentPrice}\nRSI: ${currentRsi.toFixed(2)}`;
                await sendTg(msg);
                notifiedRsiUnder40 = true;
            }
            notifiedRsiOver70 = false; // Сбрасываем другой флаг
        } 
        else if (currentRsi > 70) {
            if (!notifiedRsiOver70) {
                const msg = `⚠️ СИГНАЛ: Перекупленность, возможен разворот.\nЦена: ${currentPrice}\nRSI: ${currentRsi.toFixed(2)}`;
                await sendTg(msg);
                notifiedRsiOver70 = true;
            }
            notifiedRsiUnder40 = false; // Сбрасываем другой флаг
        } 
        else {
            // Если RSI вернулся в «нормальную» зону (40-70), сбрасываем оба флага
            notifiedRsiOver70 = false;
            notifiedRsiUnder40 = false;
        }
    } catch (e: any) {
        console.error("Ошибка в цикле:", e.message);
    }
}

console.log("Бот запущен и мониторит рынок...");
trade();
setInterval(trade, 60000);
