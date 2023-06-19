import { Client, Events } from "discord.js";
import { Commands } from "../Commands";

export default (client: Client): void => {
  client.on(Events.ClientReady, async () => {
    if (!client.user || !client.application) {
      return;
    }

    try {
      await client.application.commands.set(Commands);
      console.log("Commands parsed.")
    } catch (err) {
      console.error(err);
    }

    console.log(`${client.user.username} is now up and waiting input.`);
  });
};
