import { CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/command";
import { connectToChannel } from "../utils/connect-to-channel";
import { getVoiceConnection } from "@discordjs/voice";
import { player } from "../utils/player";

export const Join: Command = {
  name: "join",
  description: "Connects the bot to your voice channel.",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!interaction.inCachedGuild()) return;

    const channel = interaction.member?.voice.channel;
    const connection = getVoiceConnection(interaction.guildId);

    if (!channel) {
      return await interaction.followUp({
        ephemeral: true,
        content: "You must be in a voice channel for me to connect to it.",
      });
    }
    if (connection) {
      return await interaction.followUp({
        ephemeral: true,
        content:
          "I'm already in a voice channel, disconnect me first or join a different voice channel.",
      });
    }

    try {
      const connection = await connectToChannel(channel);
      connection.subscribe(player);

      return await interaction.followUp({
        ephemeral: true,
        content: `Now connected to **${channel.name}**.`,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
