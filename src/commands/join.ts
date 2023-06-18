import { CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/command";
import { connectToChannel } from "../utils/connect-to-channel";
import { player } from "../utils/player-native";

export const Join: Command = {
  name: "join",
  description: "Connects the bot to your voice channel.",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!interaction.inCachedGuild()) return;

    const channel = interaction.member?.voice.channel;

    if (channel) {
      try {
        const connection = await connectToChannel(channel);

        connection.subscribe(player);

        await interaction.followUp("Now playing...");
      } catch (err) {
        console.error(err);
      }
    } else {
      await interaction.followUp("Join a voice channel first.");
    }
  }
};
