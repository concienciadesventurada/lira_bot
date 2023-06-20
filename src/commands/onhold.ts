import { Client, CommandInteraction } from "discord.js";
import { Command } from "../interfaces/command";
import { MusicQueue } from "../lists/queue-list";
import ytdl from "ytdl-core";

// TODO: Refactor validation properly
export const OnHold: Command = {
  name: "onhold",
  description: "Returns enqueued songs",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    try {
      if (MusicQueue.isEmpty()) {
        await interaction.followUp("No queued songs.");
      } else {
        let songs = "";

        for (const song of MusicQueue.queue) {
          const {videoDetails: { title }} = await ytdl.getInfo(song);
          songs += `**=>** [${title}](<${song}>)\n`;
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
