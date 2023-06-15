"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hello = void 0;
exports.Hello = {
    name: "hello",
    description: "Returns a greeting",
    run: async (client, interaction) => {
        const content = "oLA";
        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};
//# sourceMappingURL=hello.js.map