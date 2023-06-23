import { AudioPlayerStatus } from "@discordjs/voice";
import { CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/command";
import { player } from "../utils/player";
import { formatTime } from "../utils/time";

export const Stop: Command = {
  name: "stop",
  description: "Stops the music playing.",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    try {
      if (player.state.status === AudioPlayerStatus.Playing) {
        player.stop();
        return await interaction.followUp({
          ephemeral: true,
          content: "Player has been stopped.",
        });
      } else {
        return await interaction.followUp({
          ephemeral: true,
          content: "Nothing to be stopped.",
        });
      }
    } catch (err) {
      console.log(`[${formatTime()}] STOP: Crashed.\n ${err}`);

      return await interaction.followUp({
        ephemeral: true,
        content:
          "Something went wrong while stopping and I crashed :grimacing:.",
      });
    }
  },
};
