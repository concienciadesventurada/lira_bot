import "dotenv/config";
import type { Readable } from "node:stream";
import {
  Client,
  GatewayIntentBits,
  Events,
  type VoiceBasedChannel,
} from "discord.js";
import {
  NoSubscriberBehavior,
  StreamType,
  createAudioPlayer,
  createAudioResource,
  entersState,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  joinVoiceChannel,
} from "@discordjs/voice";
import prism from "prism-media";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
//import ytdl from "ytdl-core";

const discord_token = process.env.DISCORD_TOKEN;

//const stream = ytdl(url, { filter: "audioonly" });

const type = "pulse";
const device = "audio_hw_device_id";

// TODO: Make it actually attatch
const maxTransmissionGap = 5000;

const player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Play,
    maxMissedFrames: Math.round(maxTransmissionGap / 20),
  },
});

const attachRecorder = () => {
  player.play(
    createAudioResource(
      new prism.FFmpeg({
        args: [
          "-analyzeduration",
          "0",
          "-loglevel",
          "0",
          "-f",
          type,
          "-i",
          // @ts-ignore
          type === "dshow" ? `audio=${device}` : device,
          "-acodec",
          "libopus",
          "-f",
          "opus",
          "-ar",
          "48000",
          "-ac",
          "2",
        ],
      }) as Readable,
      {
        inputType: StreamType.OggOpus,
      }
    )
  );
  console.log("Attached recorder - ready to go!");
};

player.on("stateChange", (oldState, newState) => {
  if (
    oldState.status === AudioPlayerStatus.Idle &&
    newState.status === AudioPlayerStatus.Playing
  ) {
    console.log("Playing audio output on audio player");
  } else if (newState.status === AudioPlayerStatus.Idle) {
    console.log("Playback has stopped. Attempting to restart.");
    attachRecorder();
  }
});

const connectionToChannel = async (channel: VoiceBasedChannel) => {
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  try {
    await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
    return connection;
  } catch (err) {
    connection.destroy();
    throw err;
  }
};

// TODO: REST connection

console.log("Bot is starting...");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
  ],
});

client.on(Events.MessageCreate, async (msg) => {
  if (!msg.guild) return;
  if (msg.content === "-join") {
    const channel = msg.member?.voice.channel;
    if (channel) {
      try {
        const connection = await connectionToChannel(channel);
        connection.subscribe(player);
        await msg.reply('Playing now!');
      } catch (err) {
        console.log(err);
      }
    } else {
      await msg.reply('Join a voice channel and then try again!');
    }
  }
})

ready(client);
interactionCreate(client);

void client.login(discord_token);
