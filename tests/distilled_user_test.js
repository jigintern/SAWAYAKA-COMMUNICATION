import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { distilledUserWithin24Hours } from "../library/distilled_user_within_24hour.js";
import { getNowTime } from "../library/get_time.js";

Deno.test("24時間以内に交流したユーザだけ取得できる", async () => {
  const kv = await Deno.openKv();
  const user1 = { User: 2, time: getNowTime() };
  const user2 = { User: 3, time: getNowTime() };
  kv.set(["SP", 1, 2], user1);
  kv.set(["SP", 2, 3], user2);

  const userList = await distilledUserWithin24Hours(1, kv);

  assertEquals(userList, [{
    sourceId: 1,
    destinationId: 2,
    time: user1.time,
  }]);

  await kv.close();
});
