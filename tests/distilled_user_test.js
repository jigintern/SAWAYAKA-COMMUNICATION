import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { distilledUserWithin24Hours } from "../library/distilled_user_within_24hour.js";
import { getNowTime } from "../library/get_time.js";

Deno.test("24時間以内に交流したユーザだけ取得できる", async () => {
  const request = new Request("https://example.com/?id=1");
  const user1 = {
    key: ["SP", 1, 2],
    value: {
      User: 2,
      time: getNowTime(),
    },
  };
  const user2 = {
    key: ["SP", 2, 3],
    value: {
      User: 3,
      time: getNowTime(),
    },
  };
  const kv = {
    list: async function* () {
      yield user1;
      yield user2;
    },
  };

  const response = await distilledUserWithin24Hours(request, kv);

  const data = await response.json();
  assertEquals(data, [user1]);
});
