import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionType,
} from "discord.js";
import { Command } from "../interfaces/command";
import { connectToChannel } from "../utils/connect-to-channel";
import { player } from "../utils/player";
import { AudioPlayerStatus } from "@discordjs/voice";
import { playSong } from "../utils/play-song";
import ytdl from "ytdl-core";

// TODO: Future /init or connection to channel
export const Join: Command = {
  name: "join",
  description: "Connects the bot to your voice channel.",
  options: [
    {
      name: "link",
      description: "If populated, play the added YouTube link",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!interaction.inCachedGuild()) return;

    // HACK: Implement properly, all this is an ugly monster
    const channel = interaction.member?.voice.channel;
    const link = interaction.options.get("link", true);

    if (channel && typeof link.value === "string") {
      const connection = await connectToChannel(channel);

      if (connection) {
        try {
          if (AudioPlayerStatus.Idle || AudioPlayerStatus.Paused) {
            connection.subscribe(player);
            playSong(player, link.value);
          } else if (AudioPlayerStatus.Playing) {
            connection.subscribe(player);
            playSong(player, link.value);
          }

          const info = await ytdl.getInfo(link.value);

          await interaction.followUp({
            ephemeral: true,
            content: `Now playing... ***${info.videoDetails.title}***`,
          });
        } catch (err) {
          console.error(err);
        }
      }
    } else {
      await interaction.followUp("Join a voice channel first.");
    }
  },
};
