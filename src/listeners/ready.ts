import { Client, Events } from "discord.js";
import { Commands } from "../Commands";
import { playSong } from "../utils/play-song";
import { player } from "../utils/player-native";
import { discordPlayer } from "src/utils/player";
import { YoutubeExtractor } from "@discord-player/extractor";

export default (client: Client): void => {
  client.on(Events.ClientReady, async () => {
    if (!client.user || !client.application) {
      return;
    }

    try {
      await client.application.commands.set(Commands);
      // TODO: Implement Extractors
      await discordPlayer.extractors.register(YoutubeExtractor, {});
      await playSong(player);
      console.log("Commands parsed and Audio Resource initialized.")
    } catch (err) {
      console.error(err);
    }

    console.log(`${client.user.username} is now up and waiting input.`);
  });
};
