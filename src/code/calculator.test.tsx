import { describe, it, expect } from 'vitest';
import { add, subtract } from './calculator';

describe('Calculator', () => {
  it('should add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });

  it('should subtract two numbers correctly', () => {
    expect(subtract(5, 3)).toBe(2);
    expect(subtract(0, 1)).toBe(-1);
    expect(subtract(-1, -1)).toBe(0);
  });
});