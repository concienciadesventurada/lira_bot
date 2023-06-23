import { Client, CommandInteraction } from "discord.js";
import { Command } from "../interfaces/command";
import { TrackQueue } from "../lists/queue-list";

export const Wipe: Command = {
  name: "wipe",
  description: "Wipes whatever type of list is currently playing",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    try {
      TrackQueue.queue = [];

      if (TrackQueue.isEmpty()) {
        console.log(`[${new Date().getTime()}] WIPE: Crashed.`);

        return await interaction.followUp({
          ephemeral: true,
          content: "Queue emptied correctly.",
        });
      } else {
        throw new Error("Something went wrong server side while wiping");
      }
    } catch (err) {
      console.log(`[${new Date().getTime()}] SKIP: Crashed.`);

      await interaction.followUp({
        ephemeral: true,
        content: "Something went wrong wiping the current list",
      });
    }
  },
};
