import { AudioPlayerStatus, entersState } from "@discordjs/voice";
import { CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/command";
import { player } from "../utils/player";
import { TrackQueue } from "../lists/queue-list";

export const Res: Command = {
  name: "res",
  description: "Resumes the music player.",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!interaction.inCachedGuild()) return;

    try {
      if (AudioPlayerStatus.Paused) {
        player.unpause();

        await interaction.followUp({
          ephemeral: true,
          content: "Player has been resumed.",
        });

        return entersState(player, AudioPlayerStatus.Paused, 200);
      } else if (AudioPlayerStatus.Idle) {
        const currTrack = TrackQueue.peek();

        if (currTrack) {
          player.play(currTrack.res);

          await interaction.followUp({
            ephemeral: true,
            content: "Player has been resumed.",
          });

          return entersState(player, AudioPlayerStatus.Playing, 5000);
        }
      } else {
        // FIX: This never triggers, apply proper conditionals
        return await interaction.followUp({
          ephemeral: true,
          content: "Nothing to be resumed.",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
