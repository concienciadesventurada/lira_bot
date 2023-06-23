import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionType,
} from "discord.js";
import { Command } from "../interfaces/command";
import { getVoiceConnection } from "@discordjs/voice";
import ytdl from "ytdl-core";
import { player } from "../utils/player";
import { TrackQueue } from "../lists/queue-list";
import { Track } from "../interfaces/track";
import { AudioPlayerStatus } from "@discordjs/voice";
import { formatTime } from "../utils/time";

export const Play: Command = {
  name: "play",
  description: "Plays or queues a url in a playlist",
  options: [
    {
      name: "url",
      description: "Append a url to be added to the current list",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!interaction.inCachedGuild()) return;

    // TODO: Implement validation
    const channel = interaction.member.voice.channel;
    const connection = getVoiceConnection(interaction.guildId);
    const { value: url } = interaction.options.get("url", true);

    if (!channel) {
      return await interaction.followUp({
        ephemeral: true,
        content:
          "You must be in a voice channel to play or add songs to a playlist.",
      });
    }
    if (!url || typeof url !== "string") {
      return await interaction.followUp({
        ephemeral: true,
        content: "Please provide a valid url to play or add to a playlist.",
      });
    }
    if (!connection) {
      return await interaction.followUp({
        ephemeral: true,
        content:
          "Please use the command /join or /init to connect me to your current voice channel.",
      });
    }

    const isYtLink = ytdl.validateURL(url);

    if (!isYtLink) {
      return await interaction.followUp({
        ephemeral: true,
        content:
          "The URL you provided is not valid for YouTube and therefore not streamable.",
      });
    }

    // HACK: Proper refactor, this ugly af, `stateChange` already gives me access
    // to previous states, so its redundant, but if not, loops until queue underflow
    try {
      const addedTrack = await Track.create(url);
      TrackQueue.enqueue(addedTrack);

      let currTrack = TrackQueue.peek();

      if (player.state.status === AudioPlayerStatus.Idle) {
        if (currTrack) {
          player.play(currTrack.res);

          console.log(`[${new Date().getTime()}]: Playing... ${currTrack.title}`)

          await interaction.followUp({
            ephemeral: false,
            content: `Now playing... [**${currTrack.title}**](<${currTrack.url}>).`,
          });
        }
      } else {
        await interaction.followUp({
          ephemeral: true,
          content: `Added to queue... [**${addedTrack.title}**](<${addedTrack.url}>).`,
        });
      }

      player.on("stateChange", async (prev) => {
        const nextTrack = TrackQueue.next();

        if (
          prev.status === AudioPlayerStatus.Playing &&
          player.state.status === AudioPlayerStatus.Idle
        ) {
          if (nextTrack) {
            TrackQueue.dequeue();
            currTrack = TrackQueue.peek();

            if (currTrack) {
              player.play(currTrack.res);

              await interaction.followUp({
                ephemeral: false,
                content: `Now playing... [**${currTrack.title}**](<${currTrack.url}>).`,
              });
            }
          } else if (!nextTrack && TrackQueue.length() === 1) {
            TrackQueue.dequeue();
          }
        }
        console.log(`[${formatTime()}] PLAY: Successfully executed.`)
      });
    } catch (err) {
      console.log(`[${formatTime()}] PLAY: Crashed.`)

      return await interaction.followUp({
        ephemeral: true,
        content:
          "Something went wrong playing and maybe I crashed, but I'll be back... I hope so :anguished:",
      });
    }
  },
};
