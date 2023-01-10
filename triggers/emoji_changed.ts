import { Trigger } from "deno-slack-api/types.ts";
import NotifyWorkflow from "../workflows/emoji_monitor.ts";

const trigger: Trigger<typeof NotifyWorkflow.definition> = {
  type: "event",
  name: "Emoji Changed Trigger",
  description: "Notify the channel when emoji change",
  workflow: `#/workflows/${NotifyWorkflow.definition.callback_id}`,
  event: {
    event_type: "slack#/events/emoji_changed",
    filter: {
      // add以外にremoveとrenameがあると記載があるが、removeはnameが空、renameは機能がないためaddに絞る
      version: 1,
      root: {
        statement: "{{data.subtype}} == add",
      },
    },
  },
  inputs: {
    subtype: { value: "{{data.subtype}}" },
    name: { value: "{{data.name}}" },
  },
};

export default trigger;
