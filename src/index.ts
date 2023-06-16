import "dotenv/config";
import { Client, GatewayIntentBits, VoiceBasedChannel } from "discord.js";
import {
  AudioPlayerStatus,
  StreamType,
  VoiceConnectionStatus,
  createAudioPlayer,
  createAudioResource,
  entersState,
  joinVoiceChannel,
} from "@discordjs/voice";
import interactionCreate from "./listeners/interactionCreate";
import { createDiscordJSAdapter } from "./adapter";
//import ready from "./listeners/ready";

// TODO: Refactor project structure

const player = createAudioPlayer();

const playSong = () => {
  const resource = createAudioResource(
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    { inputType: StreamType.Arbitrary }
  );
  player.play(resource);

  return entersState(player, AudioPlayerStatus.Playing, 5000);
};

const connectToChannel = async (channel: VoiceBasedChannel) => {
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: createDiscordJSAdapter(channel),
  });

  try {
    await entersState(connection, VoiceConnectionStatus.Ready, 30_000);

    return connection;
  } catch (err) {
    connection.destroy();

    throw err;
  }
};

const discord_token = process.env.DISCORD_TOKEN;

console.log("Bot is starting...");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
  ],
});

// TODO: Refactor the awaiting in ready.ts
//ready(client);

client.on("ready", async () => {
  console.log("Discord.js client is ready!");

  try {
    await playSong();
    console.log("Song is ready to play!");

  } catch (error) {
    console.error(error);
  }
});

// FIX: Bot not joining and ignoring the -join msg trigger
// TODO: Refactor and make play command
client.on("messageCreate", async (message) => {
  if (!message.guild) return;

  if (message.content === "-join") {
    console.log(message);
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
