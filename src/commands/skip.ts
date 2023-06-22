import { CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/command";
import { TrackQueue } from "../lists/queue-list";
import { player } from "../utils/player";

export const Skip: Command = {
  name: "skip",
  description:
    "Skips the current song playing. Stops if there are no more enqueued songs.",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!interaction.inCachedGuild()) return;

    // HACK: Refactor when possible, this ugly af and only half works
    // BUG: Queue Underflows if only one track in queue
    try {
      player.stop();

      const nextTrack = TrackQueue.peek();

      if (!nextTrack) {
        return await interaction.followUp({
          ephemeral: true,
          content: "There are no songs left in the queue.",
        });
      }
      player.play(nextTrack.res);
      TrackQueue.dequeue();

      return await interaction.followUp({
        ephemeral: true,
        content: `Skipped previous track. Now playing... [${nextTrack.title}](${nextTrack.url})`,
      });
    } catch (err) {
      return await interaction.followUp({
        ephemeral: true,
        content: "There are no songs left in the queue... Queue underflow.",
      });
    }
  },
};
