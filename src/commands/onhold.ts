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
      let songs = "";

      for (const song of MusicQueue.queue) {
        songs += `${song}\n`;
      }

      await interaction.followUp({
        ephemeral: true,
        content: `Songs enqueued: \n- ${songs}`,
      });
    } catch (err) {
      console.log(err);

      await interaction.followUp({
        ephemeral: true,
        content: "Something went wrong getting the enqueued songs.",
      });
    }
  },
};
