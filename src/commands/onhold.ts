import { Client, CommandInteraction } from "discord.js";
import { Command } from "../interfaces/command";
import { TrackQueue } from "../lists/queue-list";

// TODO: Refactor validation properly
export const OnHold: Command = {
  name: "onhold",
  description: "Returns enqueued songs",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    try {
      if (TrackQueue.isEmpty()) {
        await interaction.followUp("No queued songs.");
      } else {
        let songs = "";

        for (const song of TrackQueue.queue) {
          songs += `**=>** [${song.title}](<${song.url}>)\n`;
        }

        await interaction.followUp({
          ephemeral: true,
          content: `Songs enqueued:\n\n${songs}`,
        });
      }
    } catch (err) {
      console.log(err);

      await interaction.followUp({
        ephemeral: true,
        content: "Something went wrong getting the enqueued songs.",
      });
    }
  },
};
