import { CommandInteraction, Client, Interaction, Events } from "discord.js";
import { Commands } from "../Commands";

export default (client: Client): void => {
  client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction);
    }
  });
};

const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);

  if (!slashCommand) {
    interaction.reply({
      content: "The slash command you requested doesn't exist, pao ql",
      ephemeral: true,
    });
    console.log(`Algún aweonao pidió un comando que no existe.`);
    return;
  }

  try {
    await interaction.deferReply();
    slashCommand.run(client, interaction);
    console.log(`[REQ]: ${slashCommand.name.toUpperCase()} requested.`);
  } catch (err) {
    console.log(err);

    await interaction.reply({
      content: "An error occurred while executing the command.",
      ephemeral: true,
    });
  }
};
