// TODO: Would be nice to have multiple lists and pass the type as parameter
// and only wipe the selected one

import { Client, CommandInteraction } from "discord.js";
import { Command } from "../interfaces/command";
import { MusicQueue } from "../lists/queue-list";

export const OnHold: Command = {
  name: "onhold",
  description: "Returns enqueued songs",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    try {
      // TODO: Refactor validation properly
      if (MusicQueue.isEmpty()) {
        await interaction.followUp({
          ephemeral: true,
          content: "No queued songs."
        })
      }

      // HACK: Ugly solution but prints them as bullet points which is handy
      // but an array would be far cleaner and readable
      let songs = "";

      for (const song of MusicQueue.queue) {
        songs += `- ${song}\n`;
      }

      await interaction.reply({
        ephemeral: true,
        content: `Songs enqueued: ${songs}`,
      });
    } catch (err) {
      console.log(err);

      await interaction.reply({
        ephemeral: true,
        content: "Something went wrong getting the enqueued songs.",
      });
    }
  },
};
