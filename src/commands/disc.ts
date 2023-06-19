import { CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/command";
import { getVoiceConnection } from "@discordjs/voice";

export const Disc: Command = {
  name: "disc",
  description: "Disconnects the bot from the voice channel its in.",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!interaction.inCachedGuild()) return;

    const connection = getVoiceConnection(interaction.guildId);

    // DOUBT: Should I unsubscribe the player when disconnecting?
    try {
      if (connection) {
        connection?.destroy();
        await interaction.reply(
          "Player has been disconnected from the voice channel"
        );
      } else {
        await interaction.reply(
          "I'm not connected to any voice channel currently."
        );
      }
    } catch (err) {
      console.log(err);
    }

  },
};
