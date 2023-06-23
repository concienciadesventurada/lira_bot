import { CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/command";
import { TrackQueue } from "../lists/queue-list";
import { player } from "../utils/player";
import { formatTime } from "../utils/time";

export const Skip: Command = {
  name: "skip",
  description:
    "Skips the current song playing. Stops if there are no more enqueued songs.",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!interaction.inCachedGuild()) return;

    try {
      player.stop();

      let currTrack = TrackQueue.peek();
      const nextTrack = TrackQueue.next();

      if (!nextTrack) {
        TrackQueue.dequeue();

        console.log(`[${formatTime()}] SKIP: Successfully executed.`);

        return await interaction.followUp({
          ephemeral: true,
          content: `Skipped [${currTrack?.title}](<${currTrack?.url}>). There are no songs left in the queue...`,
        });
      } else {
        currTrack = nextTrack;

        player.play(currTrack.res);
        TrackQueue.dequeue();

        console.log(`[${formatTime()}] SKIP: Successfully executed.`);

        return await interaction.followUp({
          ephemeral: true,
          content: `Skipped previous track. Now playing... [${currTrack.title}](${currTrack.url}).`,
        });
      }
    } catch (err) {
      console.log(`[${formatTime()}] SKIP: Crashed.`);

      return await interaction.followUp({
        ephemeral: true,
        content: "There are no songs left in the queue... Queue underflow.",
      });
    }
  },
};
