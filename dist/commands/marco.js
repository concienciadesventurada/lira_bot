"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Marco = void 0;
exports.Marco = {
    name: "marco",
    description: "Returns a Polo",
    run: async (client, interaction) => {
        const content = "polo";
        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};
//# sourceMappingURL=marco.js.map