import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionType,
} from "discord.js";
import { Command } from "../interfaces/command";
import {
  AudioPlayerStatus,
  entersState,
  getVoiceConnection,
} from "@discordjs/voice";
import ytdl from "ytdl-core";
import { player } from "../utils/player";
import { TrackQueue } from "../lists/queue-list";
import { Track } from "../interfaces/track";

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

    // HACK: Proper refactor, this is ugly af too
    try {
      const track = await Track.create(url);
      TrackQueue.enqueue(track);
      const currTrack = TrackQueue.peek();
      const nextTrack = TrackQueue.tail();

      if (typeof currTrack !== "undefined") {
        if (player.state.status === AudioPlayerStatus.Playing) {
          if (nextTrack) {
            await interaction.followUp({
              ephemeral: true,
              content: `Added to the queue... ***${nextTrack.title}***`,
            });
          }
        }

        if (currTrack === TrackQueue.peek()) {
          player.play(currTrack.res);

          await interaction.followUp({
            ephemeral: true,
            content: `Now playing... [${currTrack.title}](${currTrack.url})`,
          });
        }

        if (nextTrack) {
          if (player.state.status === AudioPlayerStatus.Idle) {
            TrackQueue.dequeue();
            player.play(nextTrack.res);
            TrackQueue.dequeue();
          }
        }

        await entersState(player, AudioPlayerStatus.Playing, 5000);
        console.log("Playing", player.state.status);
      }
    } catch (err) {
      console.log(err);
      return await interaction.followUp({
        ephemeral: true,
        content:
          "Something went wrong playing and maybe I crashed, but I'll be back... I hope so :anguished:",
      });
    }
  },
};
