import { Command } from "./interfaces/command";
import { Hello } from "./commands/hello";
import { Jason } from "./commands/jason";
import { Marco } from "./commands/marco";

// TODO: Implement proper fs search and return an array
// TODO: Also... actual useful commands smh
export const Commands: Command[] = [Hello, Jason, Marco];
