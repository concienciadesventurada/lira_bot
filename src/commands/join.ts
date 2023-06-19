import { CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/command";
import { connectToChannel } from "../utils/connect-to-channel";
import { player } from "../utils/player-native";
import { AudioPlayerStatus } from "@discordjs/voice";
import { playSong } from "../utils/play-song";

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

        // FIX: [KINDA FIXED?] Using /join while the music is /stop or after
        // the bot has /join it doesn't resume the player
        // HACK: I don't know if this is desirable but it works, it resumes.
        if (AudioPlayerStatus.Idle || AudioPlayerStatus.Paused) {
          connection.subscribe(player);
          playSong(player);
        }

        // TODO: Template literal to show song's title
        await interaction.followUp("Now playing...");
      } catch (err) {
        console.error(err);
      }
    } else {
      await interaction.followUp("Join a voice channel first.");
    }
  },
};
