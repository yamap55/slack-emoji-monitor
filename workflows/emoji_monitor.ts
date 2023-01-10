import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { CreateSendMessageFunction } from "../functions/create_send_message.ts";

import { GetNotifyChannelFunction } from "../functions/get_notify_channel.ts";

const NotifyWorkflow = DefineWorkflow({
  callback_id: "emoji_monitor_workflow",
  title: "Emoji Monitor Workflow",
  input_parameters: {
    properties: {
      subtype: { type: Schema.slack.types.channel_id },
      name: { type: Schema.types.string },
    },
    required: ["subtype", "name"],
  },
});
const message = NotifyWorkflow.addStep(
  CreateSendMessageFunction,
  {
    subtype: NotifyWorkflow.inputs.subtype,
    name: NotifyWorkflow.inputs.name,
  },
);

const notify_channel_id = NotifyWorkflow.addStep(GetNotifyChannelFunction, {});

NotifyWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: notify_channel_id.outputs.notify_channel_id,
  message: message.outputs.send_message,
});

export default NotifyWorkflow;
