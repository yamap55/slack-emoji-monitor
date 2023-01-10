import { Trigger } from "deno-slack-api/types.ts";
import NotifyWorkflow from "../workflows/emoji_monitor.ts";

const trigger: Trigger<typeof NotifyWorkflow.definition> = {
  type: "event",
  name: "Emoji Changed Trigger",
  workflow: `#/workflows/${NotifyWorkflow.definition.callback_id}`,
  event: { event_type: "slack#/events/emoji_changed" },
  inputs: {
    subtype: { value: "{{data.subtype}}" },
    name: { value: "{{data.name}}" },
    message_ts: { value: "{{data.message_ts}}" },
  },
};

export default trigger;
