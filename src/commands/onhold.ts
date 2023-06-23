import { Client, CommandInteraction } from "discord.js";
import { Command } from "../interfaces/command";
import { TrackQueue } from "../lists/queue-list";
import { formatTime } from "../utils/time";

// TODO: Refactor validation properly
export const OnHold: Command = {
  name: "onhold",
  description: "Returns enqueued songs",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    try {
      if (!TrackQueue.isEmpty()) {
        let songs = "";

        for (const song of TrackQueue.queue) {
          songs += `**=>** [${song.title}](<${song.url}>)\n`;
        }

        await interaction.followUp({
          ephemeral: true,
          content: `Songs enqueued:\n\n${songs}`,
        });
      } else {
        return await interaction.followUp({
          ephemeral: true,
          content: "No queued songs.",
        });
      }
    } catch (err) {
      console.log(`[${formatTime()}] ONHOLD: Crashed.\n ${err}`);

      await interaction.followUp({
        ephemeral: true,
        content: "Something went wrong getting the enqueued songs.",
      });
    }
  },
};
