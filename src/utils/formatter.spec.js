import { formatCurrency } from './formatter';

describe('utils/formatter', () => {
  describe('formatCurrency', () => {
    it('should return currency values', () => {
      expect(formatCurrency(100)).toBe('100.00');
      expect(formatCurrency(1000)).toBe('1,000.00');
      expect(formatCurrency(1000.11111)).toBe('1,000.11');
    });
  });
});
