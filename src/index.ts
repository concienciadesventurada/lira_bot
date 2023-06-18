import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  VoiceBasedChannel,
  Events,
} from "discord.js";
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
import { createDiscordJSAdapter } from "./utils/adapter";
import { Commands } from "./Commands";
//import ready from "./listeners/ready";

// TODO: Refactor project structure
// TODO: Player states

const player = createAudioPlayer();

const playSong = () => {
  const resource = createAudioResource(
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    { inputType: StreamType.Arbitrary }
  );
  player.play(resource);

  return entersState(player, AudioPlayerStatus.Playing, 5000);
};

// TODO: Refactor in its own file
const connectToChannel = async (channel: VoiceBasedChannel) => {
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: createDiscordJSAdapter(channel),
    selfDeaf: false,
    selfMute: false,
  });

  // FIX: It connects but the status is not correctly set so it never plays
  // FIX: Times out instead of entering idle
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
    GatewayIntentBits.MessageContent,
  ],
});

// TODO: Refactor the awaiting in ready.ts
//ready(client);

client.on(Events.ClientReady, async () => {
  console.log("Discord.js client is ready!");

  try {
    await client.application?.commands.set(Commands);
    await playSong();
    console.log("Song is ready to play!");
  } catch (error) {
    console.error(error);
  }
});

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
