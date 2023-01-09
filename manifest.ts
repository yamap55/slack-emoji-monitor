import { Manifest } from "deno-slack-sdk/mod.ts";
import NotifyWorkflow from "./workflows/emoji_monitor.ts";

export default Manifest({
  name: "slack-emoji-monitor",
  description: "slack emoji notify",
  icon: "assets/default_new_app_icon.png",
  workflows: [NotifyWorkflow],
  outgoingDomains: [],
  botScopes: ["commands", "channels:read", "chat:write", "chat:write.public", "emoji:read"],
});
