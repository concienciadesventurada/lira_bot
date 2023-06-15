"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jason = void 0;
exports.Jason = {
    name: "jason",
    description: "Returns a Jason",
    run: async (client, interaction) => {
        const content = "oLA jason culiao basao";
        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};
//# sourceMappingURL=jason.js.map