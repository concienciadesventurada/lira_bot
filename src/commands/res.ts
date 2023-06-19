import { AudioPlayerStatus } from "@discordjs/voice";
import { CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/command";
import { player } from "../utils/player";

export const Res: Command = {
  name: "res",
  description: "Resumes the music player.",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!interaction.inCachedGuild()) return;

    try {
      if (AudioPlayerStatus.Playing) {
        player.unpause();
        await interaction.followUp({
          ephemeral: true,
          content: "Player has been resumed.",
        });
      } else {
        // FIX: This never triggers, apply proper conditionals
        await interaction.followUp({
          ephemeral: true,
          content: "Nothing to be resumed.",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
