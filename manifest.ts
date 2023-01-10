import { Manifest } from "deno-slack-sdk/mod.ts";
import NotifyWorkflow from "./workflows/emoji_monitor.ts";

export default Manifest({
  name: "slack-emoji-monitor",
  description: "slack emoji notify",
  icon: "assets/seikou_banzai_man.png",
  workflows: [NotifyWorkflow],
  outgoingDomains: [],
  botScopes: ["chat:write", "chat:write.public", "emoji:read"],
});
