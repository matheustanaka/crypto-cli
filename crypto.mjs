#! /usr/bin/env node
import fetch from "node-fetch";
import yargs from "yargs";

const { argv } = yargs(process.argv);
const response = await fetch("https://api2.binance.com/api/v3/ticker/24hr");
const data = await response.json();

let largestPrice = "";
let symbol = "";
let priceChangePercent = "";
let highPrice = "";
let dollarUSLocale = Intl.NumberFormat("en-US");

data.forEach((crypto) => {
  if (crypto.lastPrice > largestPrice) {
    largestPrice = crypto.lastPrice;
    symbol = crypto.symbol;
    priceChangePercent = crypto.priceChangePercent;
    highPrice = crypto.highPrice;
  }
});

// Commands CLI: crypto --price
if (argv.price) {
    console.log(`
    The largest Crypto Coin Price in the last 24 Hours\n
    Price: $${dollarUSLocale.format(largestPrice)}\n
    Symbol: ${symbol}\n
    Price Change Percent: %${priceChangePercent}\n
    High Price: $${dollarUSLocale.format(highPrice)}
    `);
}
// Commands CLI: crypto-status --ethereum
if (argv.ethereum) {
    data.filter((crypto) => { 
        if(crypto.symbol == "ETHUSDT") {
            console.log(`
            Ethereum Average Price in the last 24 Hours\n
            Symbol: ${crypto.symbol}\n
            Price: $${dollarUSLocale.format(crypto.lastPrice)}\n
            Price Change Percent: %${crypto.priceChangePercent}\n
            High Price: $${dollarUSLocale.format(crypto.highPrice)}`)
        }
    })
}
// Commands CLI: crypto-status --bitcoin
if (argv.bitcoin) {
    data.filter((crypto) => { 
        if(crypto.symbol == "BTCUSDT") {
            console.log(`
            Bitcoin Average Price in the last 24 Hours\n
            Symbol: ${crypto.symbol}\n
            Price: $${dollarUSLocale.format(crypto.lastPrice)}\n
            Price Change Percent: %${crypto.priceChangePercent}\n
            High Price: $${dollarUSLocale.format(crypto.highPrice)}`)
        }
    })    
}