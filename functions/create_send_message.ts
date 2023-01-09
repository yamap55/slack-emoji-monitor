import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
const _SUBTYPE_MESSAGES: Map<string, string> = new Map([
  ["remove", "絵文字が削除されました"],
  ["rename", "絵文字が変更されました"],
  ["add", "絵文字が追加されました"],
]);

const createMessage = (
  subtype: string,
  names: Array<string>,
  // message_ts: string,
): string => {
  const emoji = names.map((x) => `:${x}:`).join(" ");
  const base_message = [emoji].join("\n");
  const top_message = _SUBTYPE_MESSAGES.get(subtype);
  return `${top_message}\n\n${base_message}`;
};

export const CreateSendMessageFunction = DefineFunction({
  callback_id: "create_send_message",
  title: "Create Send Message",
  description: "Create Send Message",
  source_file: "functions/create_send_message.ts",
  input_parameters: {
    properties: {
      subtype: {
        type: Schema.types.string,
        description: "Subtype",
      },
      names: {
        type: Schema.types.array,
        description: "Names",
      },
      message_ts: {
        type: Schema.types.string,
        description: "Message ts",
      },
    },
    required: ["subtype", "names", "message_ts"],
  },
  output_parameters: {
    properties: {
      send_message: {
        type: Schema.types.string,
        description: "Send Message",
      },
    },
    required: ["send_message"],
  },
});

export default SlackFunction(
  CreateSendMessageFunction,
  ({ inputs }) => {
    const send_message = createMessage(
      inputs.subtype,
      inputs.names,
      // inputs.message_ts,
    );
    return { outputs: { send_message } };
  },
);
