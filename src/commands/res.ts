import { AudioPlayerStatus, entersState } from "@discordjs/voice";
import { CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/command";
import { player } from "../utils/player";
import { TrackQueue } from "../lists/queue-list";
import { formatTime } from "../utils/time";

export const Res: Command = {
  name: "res",
  description: "Resumes the music player.",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    try {
      if (player.state.status === AudioPlayerStatus.Paused) {
        player.unpause();

        await interaction.followUp({
          ephemeral: true,
          content: "Player has been resumed.",
        });

        console.log(`[${formatTime()}] RES: Successfully executed.`);

        return await entersState(player, AudioPlayerStatus.Paused, 200);
      } else {
        const currTrack = TrackQueue.peek();

        if (!currTrack) {
          console.log(`[${formatTime()}] RES: Successfully executed.`);

          return await interaction.followUp({
            ephemeral: true,
            content: "Nothing to be resumed.",
          });
        } else {
          player.play(currTrack.res);

          await interaction.followUp({
            ephemeral: true,
            content: "Player has been resumed.",
          });

          await entersState(player, AudioPlayerStatus.Playing, 5000);
          console.log(`[${formatTime()}] RES: Successfully executed.`);
        }
      }
    } catch (err) {
      console.log(`[${formatTime()}] RES: Crashed.`);

      return await interaction.followUp({
        ephemeral: true,
        content: "Something went wrong resuming and I crashed :woozy_face:...",
      });
    }
  },
};
