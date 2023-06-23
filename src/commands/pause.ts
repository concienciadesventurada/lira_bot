import { AudioPlayerStatus, entersState } from "@discordjs/voice";
import { CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/command";
import { player } from "../utils/player";

export const Pause: Command = {
  name: "pause",
  description: "Pauses the music playing.",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!interaction.inCachedGuild()) return;

    // FIX: This never triggers, apply proper conditionals
    // FIX: Two or more /pause in a row result in just executes first case
    try {
      if (AudioPlayerStatus.Playing) {
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
      console.log(`[${new Date().getTime()}] PAUSE: Crashed.\n ${err}`);

      return await interaction.followUp({
        ephemeral: true,
        content: "An error occured while /pause and I crashed :cold_sweat:...",
      });
    }
  },
};
