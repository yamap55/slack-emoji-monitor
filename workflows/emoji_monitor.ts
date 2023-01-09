import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { CreateSendMessageFunction } from "../functions/create_send_message.ts";

import { GetNotifyChannelFunction } from "../functions/get_notify_channel.ts";

const NotifyWorkflow = DefineWorkflow({
  callback_id: "emoji_monitor_workflow",
  title: "Emoji Monitor Workflow",
  input_parameters: {
    properties: {
      subtype: { type: Schema.slack.types.channel_id },
      names: { type: Schema.types.array },
      message_ts: { type: Schema.types.string },
    },
    required: [
      "subtype",
      "names",
      "message_ts",
    ],
  },
});
const message = NotifyWorkflow.addStep(
  CreateSendMessageFunction,
  {
    subtype: NotifyWorkflow.inputs.subtype,
    names: NotifyWorkflow.inputs.names,
    message_ts: NotifyWorkflow.inputs.message_ts,
  },
);

const notify_channel_id = NotifyWorkflow.addStep(GetNotifyChannelFunction, {});

NotifyWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: notify_channel_id.outputs.notify_channel_id,
  message: message.outputs.send_message,
});

export default NotifyWorkflow;
