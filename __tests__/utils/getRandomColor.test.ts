import { getRandomColor } from "@/utils/getRandomColor";

const HEX_REGEX = /^#[0-9a-f]{6}$/i;

describe("getRandomColor", () => {
  it("should return a random color", () => {
    const color = getRandomColor();
    expect(color).toMatch(HEX_REGEX);
  });
});
