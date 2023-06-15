"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = require("discord.js");
const ready_1 = __importDefault(require("./listeners/ready"));
const interactionCreate_1 = __importDefault(require("./listeners/interactionCreate"));
const discord_token = process.env.DISCORD_TOKEN;
console.log("Bot is starting...");
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
(0, ready_1.default)(client);
(0, interactionCreate_1.default)(client);
client.login(discord_token);
//# sourceMappingURL=index.js.map