import { AudioPlayerStatus } from "@discordjs/voice";
import { CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/command";
import { player } from "../utils/player";

export const Stop: Command = {
  name: "stop",
  description: "Stops the music playing.",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!interaction.inCachedGuild()) return;

    try {
      // DOUBT: Should I unsubscribe when fully stopping?
      if (AudioPlayerStatus.Playing) {
        player.stop();
        await interaction.followUp({
          ephemeral: true,
          content: "Player has been stopped.",
        });
      } else {
        await interaction.followUp({
          ephemeral: true,
          content: "Nothing to be stopped.",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
