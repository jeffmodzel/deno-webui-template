import { assertEquals } from "@std/assert";

Deno.test("webserver basic test", () => {
  const response = { status: "ok" };
  assertEquals(response.status, "ok");
});