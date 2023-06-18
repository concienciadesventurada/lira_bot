import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";

// TODO: Refactor project structure
// TODO: Player states

const discord_token = process.env.DISCORD_TOKEN;

console.log("Bot is starting...");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

ready(client);
interactionCreate(client);

void client.login(discord_token);
