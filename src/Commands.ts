import { Command } from "./interfaces/command";
import { Play } from "./commands/play";
import { Wipe } from "./commands/wipe";
import { OnHold } from "./commands/onhold";
import { Join } from "./commands/join";

// TODO: Implement proper fs search and return an array
export const Commands: Command[] = [Play, Wipe, OnHold, Join];
