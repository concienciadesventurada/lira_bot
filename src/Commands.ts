import { Command } from "./interfaces/command";
import { Play } from "./commands/play";
import { Wipe } from "./commands/wipe";
import { OnHold } from "./commands/onhold";
import { Join } from "./commands/join";
import { Stop } from "./commands/stop";
import { Disc } from "./commands/disc";
import { Pause } from "./commands/pause";
import { Res } from "./commands/res";
import { Skip } from "./commands/skip";

// TODO: Implement proper fs search and return an array
export const Commands: Command[] = [
  Play,
  Wipe,
  OnHold,
  Join,
  Stop,
  Disc,
  Pause,
  Res,
  Skip
];
