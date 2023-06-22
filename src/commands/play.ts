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

    // [${title}](<${url}>)
    try {
      const addedTrack = await Track.create(url);
      TrackQueue.enqueue(addedTrack);
      let currTrack = TrackQueue.peek();

      if (player.state.status === AudioPlayerStatus.Idle) {
        if (currTrack) {
          player.play(currTrack.res);

          console.log(`1ER LOOP: ${player.state.status}, ${currTrack.title}`)

          await interaction.followUp({
            ephemeral: true,
            content: `**[1ER LOOP]** Now playing... [**${currTrack.title}**](<${currTrack.url}>).`,
          });
        }
      } else {
        console.log(`2DO LOOP QUEUE: ${player.state.status}, ${currTrack?.title}`)
        await interaction.followUp({
          ephemeral: true,
          content: `**[2DO LOOP QUEUE]** Added to queue... [**${addedTrack.title}**](<${addedTrack.url}>).`,
        });
      }

      player.on("stateChange", async (prev) => {
        //if (prev.status === AudioPlayerStatus.Idle && player.state.status === AudioPlayerStatus.Playing) {
        //  console.log(currTrack?.title);
        //  TrackQueue.dequeue();
        //}

        if (prev.status === AudioPlayerStatus.Playing && player.state.status === AudioPlayerStatus.Idle) {
          TrackQueue.dequeue();
          currTrack = TrackQueue.peek();

          if (currTrack) {
            player.play(currTrack.res);

            console.log('prevPlaying && currTrack', currTrack?.title);

            await interaction.followUp({
              ephemeral: true,
              content: `**[PLAYER PLAY]** Now playing... [**${currTrack.title}**](<${currTrack.url}>).`,
            });
          }
        } else if (player.state.status === AudioPlayerStatus.Idle && TrackQueue.isEmpty()) {
          await interaction.followUp({
            ephemeral: true,
            content: `Empty queue, add songs to play.`,
          });
        }

      });
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
