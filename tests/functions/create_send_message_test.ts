import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "https://deno.land/std@0.171.0/testing/asserts.ts";

const { createContext } = SlackFunctionTester("my-function");

import create_send_message from "../../functions/create_send_message.ts";

Deno.test("Normal Case", async () => {
  const inputs = {
    name: "name_1",
    subtype: "add",
  };
  const { outputs } = await create_send_message(createContext({ inputs }));
  const actual = outputs?.send_message;
  const expected = `絵文字が追加されました
:name_1:`;
  assertEquals(actual, expected);
});
