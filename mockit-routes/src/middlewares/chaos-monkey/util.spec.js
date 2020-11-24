const { hitByMonkey } = require('./util');

describe('Utils', () => {
  describe('hitByMonkey', () => {
    it('returns true when Math.random returns greater than 0.5', async () => {
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 0.6;
      global.Math = mockMath;
      const result = hitByMonkey();
      expect(result).toEqual(true);
    });
    it('returns false when Math.random returns less than 0.5', async () => {
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 0.4;
      global.Math = mockMath;
      const result = hitByMonkey();
      expect(result).toEqual(false);
    });
  });
});
