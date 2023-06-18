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
    },
  ],
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    // HACK: This is an ugly implementation but it parses the value from the link
    const options = interaction.options.data;

    try {
      const link = options[0].value;

      if (MusicQueue.length() < MusicQueue.limit && typeof link === "string") {
        MusicQueue.enqueue(link);
        console.log(MusicQueue);

        await interaction.followUp({
          ephemeral: true,
          content: `"${link}" added to the Queue!`,
        });
      }
    } catch (err) {
      console.log(err);

      await interaction.followUp({
        ephemeral: true,
        content: "You must provide a link",
      });

    }

  }
};
