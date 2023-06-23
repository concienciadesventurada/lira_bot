import { Client } from "@discordjs/core";
import { Command } from "../interfaces/command";
import { TrackQueue } from "../lists/queue-list";
import { formatTime } from "../utils/time";

export const Next: Command = {
  name: "next",
  description: "Shows the next song in the Queue.",
  // @ts-ignore
  run: async (client: Client, interaction) => {
    if (!interaction.inCachedGuild()) return;

    const nextTrack = TrackQueue.next();

    try {
      if (!nextTrack) {
        await interaction.followUp({
          ephemeral: true,
          content: "There are no songs left in the queue.",
        });

        console.log(`[${formatTime()}]: NEXT executed correctly.`);
      } else {
        await interaction.followUp({
          ephemeral: true,
          content: `The next song is [${nextTrack.title}](<${nextTrack.url}>)`,
        });

        console.log(`[${formatTime()}]: NEXT executed correctly.`);
      }
    } catch (err) {
      console.log(err);

      return await interaction.followUp({
          ephemeral: true,
          content: "Something went wrong fetching the next song and I crashed :skull:...",
        });
    }
  },
};
