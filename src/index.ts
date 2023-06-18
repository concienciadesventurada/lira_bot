import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";
import { player } from "./utils/player-native";
import { connectToChannel } from "./utils/connect-to-channel";

// TODO: Refactor project structure
// TODO: Player states

// TODO: Refactor in its own file
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

// TODO: Refactor and make play command
client.on("messageCreate", async (message) => {
  if (!message.guild) return;

  if (message.content === "-join") {
    const channel = message.member?.voice.channel;

    if (channel) {
      try {
        const connection = await connectToChannel(channel);

        connection.subscribe(player);
        await message.reply("Playing now!");
      } catch (error) {
        console.error(error);
      }
    } else {
      void message.reply("Join a voice channel then try again!");
    }
  }
});

interactionCreate(client);

void client.login(discord_token);
