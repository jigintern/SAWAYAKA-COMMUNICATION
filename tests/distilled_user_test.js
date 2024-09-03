import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  it,
} from "https://deno.land/std@0.193.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { distilledUserWithin24Hours } from "../library/distilled_user_within_24hour.js";
import { getNowTime } from "../library/get_time.js";

describe("24時間以内に交流したユーザ判定", () => {
  let kv;

  beforeAll(async () => {
    kv = await Deno.openKv(":memory:");
  });

  afterAll(async () => {
    await kv.close();
  });

  afterEach(async () => {
    for await (const entry of kv.list({ prefix: [] })) {
      await kv.delete(entry.key);
    }
  });

  it("ユーザがSPを贈ると、交流したとこになる", async () => {
    const user = { User: 2, time: getNowTime() };
    kv.set(["SP", 1, 100], user);

    const userList = await distilledUserWithin24Hours(1, kv);

    assertEquals(userList, [{
      sourceId: 1,
      destinationId: 2,
      time: user.time,
    }]);
  });

  it("ユーザがSPを貰っても、交流したことになる", async () => {
    const user = { User: 1, time: getNowTime() };
    kv.set(["SP", 2, 100], user);

    const userList = await distilledUserWithin24Hours(1, kv);

    assertEquals(userList, [{
      sourceId: 2,
      destinationId: 1,
      time: user.time,
    }]);
  });

  it("交流履歴があるユーザだけ取得できる", async () => {
    const user1 = { User: 2, time: getNowTime() };
    const user2 = { User: 3, time: getNowTime() };
    kv.set(["SP", 1, 100], user1);
    kv.set(["SP", 2, 101], user2);

    const userList = await distilledUserWithin24Hours(1, kv);

    assertEquals(userList, [{
      sourceId: 1,
      destinationId: 2,
      time: user1.time,
    }]);
  });

  it("24時間以内に交流したユーザだけ取得できる", async () => {
    // 1日前に交流したユーザ
    const user1 = {
      User: 2,
      time: new Date(getNowTime()).getTime() - 24 * 60 * 60 * 1000,
    };
    // 1時間前に交流したユーザ
    const user2 = {
      User: 3,
      time: new Date(getNowTime()).getTime() - 60 * 60 * 1000,
    };
    // 1週間に交流したユーザ
    const user3 = {
      User: 4,
      time: new Date(getNowTime()).getTime() - 7 * 24 * 60 * 60 * 1000,
    };
    kv.set(["SP", 1, 100], user1);
    kv.set(["SP", 1, 101], user2);
    kv.set(["SP", 1, 102], user3);

    const userList = await distilledUserWithin24Hours(1, kv);

    assertEquals(userList, [{
      sourceId: 1,
      destinationId: 3,
      time: user2.time,
    }]);
  });
});
