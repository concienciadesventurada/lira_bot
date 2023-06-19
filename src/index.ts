import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";

// TODO: Implement different queue of AudioResources
// TODO: Implement command to init these different data structures
// TODO: Enqueue, Head, Tail, Peek and other commands for data structures
// TODO: Init command to create connection and playlists
// TODO: Skip command
// TODO: REST to run containerized or be deployable on hosting services
// FIX: Disconnecting while streaming crashes the bot despite error handling
// in the playSong() function

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
