import { AudioPlayerStatus, entersState } from "@discordjs/voice";
import { CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/command";
import { player } from "../utils/player";
import { formatTime } from "../utils/time";

export const Pause: Command = {
  name: "pause",
  description: "Pauses the music playing.",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!interaction.inCachedGuild()) return;

    try {
      if (player.state.status === AudioPlayerStatus.Playing) {
        player.pause();

        await interaction.followUp({
          ephemeral: true,
          content: "Player has been paused.",
        });

        return entersState(player, AudioPlayerStatus.Paused, 200);
      } else {
        await interaction.followUp({
          ephemeral: true,
          content: "Nothing to be paused.",
        });

        return entersState(player, AudioPlayerStatus.Idle, 200);
      }
    } catch (err) {
      console.log(`[${formatTime()}] PAUSE: Crashed.\n ${err}`);

      return await interaction.followUp({
        ephemeral: true,
        content: "An error occured while /pause and I crashed :cold_sweat:...",
      });
    }
  },
};
