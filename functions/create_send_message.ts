import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
// 現在はaddのみ動作するようにtriggerでaddに限定している（削除時にはemojiのnameが渡されない、renameは発生しない）
const _SUBTYPE_MESSAGES: Map<string, string> = new Map([
  ["remove", "絵文字が削除されました"],
  ["rename", "絵文字が変更されました"],
  ["add", "絵文字が追加されました"],
]);

const createMessage = (
  subtype: string,
  name: string,
): string => {
  const emoji = `:${name}:`;
  const top_message = _SUBTYPE_MESSAGES.get(subtype);
  return `${top_message}\n${emoji}`;
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
      name: {
        type: Schema.types.string,
        description: "Name",
      },
    },
    required: ["subtype", "name"],
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

export default SlackFunction(CreateSendMessageFunction, ({ inputs }) => {
  const send_message = createMessage(inputs.subtype, inputs.name);
  return { outputs: { send_message } };
});
