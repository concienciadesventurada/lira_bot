// TODO: Add the player and subscribe it
// TODO: Make it actually play

import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionType,
} from "discord.js";
import { Command } from "../interfaces/command";
import { MusicQueue } from "../lists/queue-list";

export const Play: Command = {
  name: "play",
  description: "Plays or queues a link in a playlist",
  options: [
    {
      name: "link",
      description: "Append a link to be added to the current list",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    const link = interaction.options.get("link", true);

    try {
      if (MusicQueue.length() < MusicQueue.limit && typeof link.value === "string") {
        MusicQueue.enqueue(link.value);
        console.log('queue', MusicQueue.queue);
        await interaction.followUp({
          ephemeral: true,
          content: `***${link.value}*** added to the Queue!`,
        });
      } else {
        await interaction.followUp({
          ephemeral: true,
          content: "Your item couldn't be added to the Queue."
        })
      }
    } catch (err) {
      console.log(err);

      await interaction.followUp({
        ephemeral: true,
        content: "You must provide a link",
      });
    }
  },
};
