import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";

// TODO: Implement command to init these different data structures
// TODO: Init command to create connection and playlists
// TODO: REST to run containerized or be deployable on hosting services

const discord_token = process.env.DISCORD_TOKEN;

export const client = new Client({
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
