#!/usr/bin/env node
const fs = require("fs");
let input = process.argv.slice(2).join(" ");
if (fs.existsSync(input)) {
  try { input = fs.readFileSync(input, "utf8"); } catch {}
}
if (!input || input === "-h" || input === "--help") {
  console.log("Usage: prompt-token-count <prompt-text-or-file>");
  console.log("Example: prompt-token-count \"Analyze this financial document and summarize key metrics.\"");
  process.exit(input ? 0 : 1);
}
const words = input.trim().split(/\s+/).length;
const chars = input.length;
// Standard token estimation rule: ~1 token per 4 characters / 0.75 words
const estimatedTokens = Math.ceil(chars / 3.8);
console.log("\x1b[36m=== LLM Prompt Token Estimate ===\x1b[0m");
console.log(`Characters:       ${chars}`);
console.log(`Words:            ${words}`);
console.log(`Estimated Tokens: \x1b[32m~${estimatedTokens} tokens\x1b[0m`);
console.log(`Est. Cost (GPT-4o / Claude 3.5 Sonnet / Gemini 1.5 Pro input):`);
console.log(`  - Input (~$2.50/M tokens): \x1b[33m$${((estimatedTokens / 1000000) * 2.5).toFixed(6)}\x1b[0m`);
