// TODO:
import { AudioPlayerStatus } from "@discordjs/voice";
import { CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/command";
import { player } from "../utils/player-native";

export const Pause: Command = {
  name: "pause",
  description: "Pauses the music playing.",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!interaction.inCachedGuild()) return;

    try {
      if (AudioPlayerStatus.Playing) {
        player.pause();
        await interaction.followUp({
          ephemeral: true,
          content: "Player has been paused.",
        });
      } else {
        await interaction.followUp({
          ephemeral: true,
          content: "Nothing to be paused.",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
