import { Client, Events } from "discord.js";
import { Commands } from "../Commands";

export default (client: Client): void => {
  client.on(Events.ClientReady, async () => {
    if (!client.user || !client.application) {
      return;
    }

    try {
      await client.application.commands.set(Commands);
      //await playSong()
    } catch (err) {
      console.error(err);
    }
    await client.application.commands.set(Commands);

    console.log(`${client.user.username} is online`);
  });
};
