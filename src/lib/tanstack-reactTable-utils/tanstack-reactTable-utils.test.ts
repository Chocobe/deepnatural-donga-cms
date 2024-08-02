import {
  extractID,
} from './tanstack-reactTable-utils';

describe('tanstack-reactTable-utils 테스트', () => {
  describe('test extractId()', () => {
    it('"hello_world_id" => "id"', () => {
      const result = extractID('hello_world_id');

      expect(result).toBe('id');
    });

    it('"1_hello_world_id" => "id"', () => {
      const result = extractID('1_hello_world_id');

      expect(result).toBe('id');
    });

    it('"2_hello_3_world_id" => "id"', () => {
      const result = extractID('2_hello_3_world_id');

      expect(result).toBe('id');
    });

    it('"hello" => "hello"', () => {
      const result = extractID('hello');

      expect(result).toBe('hello');
    });

    it('"1" => "1"', () => {
      const result = extractID('1');

      expect(result).toBe('1');
    });

    it('"0_1" => "1"', () => {
      const result = extractID('0_1');

      expect(result).toBe('1');
    });

    it('"" => null', () => {
      const result = extractID('');

      expect(result).toBeNull();
    });

    it('" " => " "', () => {
      const result = extractID(' ');

      expect(result).toBe(' ');
    });
  });
});
