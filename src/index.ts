import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";

const discord_token = process.env.DISCORD_TOKEN;

// TODO: Implement guilds and REST connection

console.log("Bot is starting...");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

ready(client);
interactionCreate(client);

client.login(discord_token);
