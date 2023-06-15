import { Client, Events } from "discord.js";
import { Commands } from "../Commands";
import { attachRecorder } from "./attachRecorder";
import { player } from "./player";
import { AudioPlayerStatus } from "@discordjs/voice";

export default (client: Client): void => {
  client.on(Events.ClientReady, async () => {
    if (!client.user || !client.application) {
      return;
    }

    await client.application.commands.set(Commands);

    player.on("stateChange", (oldState, newState) => {
      if (
        oldState.status === AudioPlayerStatus.Idle &&
        newState.status === AudioPlayerStatus.Playing
      ) {
        console.log("Playing audio output on audio player");
      } else if (newState.status === AudioPlayerStatus.Idle) {
        console.log("Playback has stopped. Attempting to restart.");
        attachRecorder();
      }
    });

    console.log(`${client.user.username} is online`);
  });
};
