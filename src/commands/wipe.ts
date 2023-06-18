// TODO: Would be nice to have multiple lists and pass the type as parameter
// and only wipe the selected one

import { Client, CommandInteraction } from "discord.js";
import { Command } from "../interfaces/command";
import { MusicQueue } from "../lists/queue-list";

export const Wipe: Command = {
  name: "wipe",
  description: "Wipes whatever type of list is currently playing",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    try {
      MusicQueue.queue = [];

      if (MusicQueue.isEmpty()) {
        await interaction.followUp({
          ephemeral: true,
          content: "Queue emptied correctly.",
        });
      } else {
        throw new Error("Something went wrong server side while wiping");
      }
    } catch (err) {
      console.log(err);
      await interaction.followUp({
        ephemeral: true,
        content: "Something went wrong wiping the current list",
      });
    }
  },
};
