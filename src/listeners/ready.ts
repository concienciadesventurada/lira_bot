import { Client, Events } from "discord.js";
import { Commands } from "../Commands";
import { playSong } from "../utils/play-song";
import { player } from "../utils/player-native";

export default (client: Client): void => {
  client.on(Events.ClientReady, async () => {
    if (!client.user || !client.application) {
      return;
    }

    try {
      await client.application.commands.set(Commands);
      await playSong(player);
    } catch (err) {
      console.error(err);
    }

    console.log(`${client.user.username} is online`);
  });
};
