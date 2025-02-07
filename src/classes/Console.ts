import { CommandHandler } from "./CommandHandler.js";

/**
 * Change the outputs of specific console functions;
 * To enable chat log ingame, run `/tag @s add devLog`
 */
export class Console {
  /**
   * @throws
   */
  constructor() {
    throw new Error("Cannot create instance of this class");
  }

  /**
   * Make console.log() output to chat
   * @default true
   */
  static outputConsoleLogToChat: true;
  /**
   * Make console.error() output to chat
   * @default true
   */
  static outputConsoleErrorToChat: true;
}

function logToChat(data: any[], prefix = "") {
  // Source: https://wiki.bedrock.dev/scripting/scripting-intro.html#log
  function toString(item: any): string {
    if (item instanceof Error) {
      return `${item.name} ${item.message} ${item.stack}`;
    }
    switch (Object.prototype.toString.call(item)) {
      case "[object Undefined]":
        return "undefined";
      case "[object Null]":
        return "null";
      case "[object String]":
        return `"${item}"`;
      case "[object Array]":
        const array = item.map(toString);
        return `[${array.join(", ")}]`;
      case "[object Object]":
        const object = Object.keys(item).map(
          (key) => `${key}: ${toString(item[key])}`
        );
        return `{${object.join(", ")}}`;
      case "[object Function]":
        return `Function ${item.name}`;
      case "[object Map]":
        return `Map`;
      default:
        return item;
    }
  }

  let msg = data.map(toString).join(" ");

  CommandHandler.run(
    `tellraw @a[tag=devLog] {"rawtext":[{"text":"${prefix}${JSON.stringify(
      msg
    ).slice(1)}}]}`
  );
}

const logFunc = console.log;
console.log = function (...data: any[]) {
  logFunc.apply(console, arguments);

  if (!Console.outputConsoleLogToChat) return;

  logToChat(data, "§b[Info] §r");
};

const errorFunc = console.error;
console.error = function (...data: any[]) {
  errorFunc.apply(console, data);

  if (!Console.outputConsoleErrorToChat) return;

  logToChat(data, "§4[Error] §c");
};
