import { init } from "../server";

describe("authentication tests", () => {
  beforeAll(async () => {
    console.log("This is before all");
  });

  test("test my name", () => {
    expect("Phumiphat Harry").toBe("Phumiphat Harry");
  });
});
