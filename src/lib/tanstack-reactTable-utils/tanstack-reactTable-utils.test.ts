import {
  addOriginItemIndexToTableData,
  extractID,
} from './tanstack-reactTable-utils';

describe('tanstack-reactTable-utils 테스트', () => {
  describe('Test extractID()', () => {
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

  describe('Test addOriginItemIndexToTableData()', () => {
    it('Not processed if item is not an object type 1', () => {
      const tableData = ['hello world'];

      const result = addOriginItemIndexToTableData(tableData);

      expect(result).toEqual([
        'hello world',
      ]);
    }),

    it('Not processed if item is not an object type 2', () => {
      const tableData = [
        {
          id: 0,
          value: 'value-0',
        },
        'hello world',
        {
          id: 1,
          value: 'value-1',
        },
        true,
        333,
      ];

      const result = addOriginItemIndexToTableData(tableData);

      expect(result).toEqual([
        {
          id: 0,
          value: 'value-0',
          originItemIndex: 0,
        },
        'hello world',
        {
          id: 1,
          value: 'value-1',
          originItemIndex: 2,
        },
        true,
        333,
      ]);
    });

    it('process blank item', () => {
      const tableData = [];

      const result = addOriginItemIndexToTableData(tableData);

      expect(result).toEqual([]);
    });

    it('process one item', () => {
      const tableData = [
        {
          id: 0,
          value: 'value-0',
        },
      ];

      const result = addOriginItemIndexToTableData(tableData);

      expect(result).toEqual([
        {
          id: 0,
          value: 'value-0',
          originItemIndex: 0,
        },
      ]);
    });

    it('process two items', () => {
      const tableData = [
        {
          id: 0,
          value: 'value-0',
        },
        {
          id: 1,
          value: 'value-1',
        },
      ];

      const result = addOriginItemIndexToTableData(tableData);

      expect(result).toEqual([
        {
          id: 0,
          value: 'value-0',
          originItemIndex: 0,
        },
        {
          id: 1,
          value: 'value-1',
          originItemIndex: 1,
        },
      ]);
    });

    it('process 10 items', () => {
      const tableData = [
        {
          id: 0,
          value: 'value-0',
        },
        {
          id: 1,
          value: 'value-1',
        },
        {
          id: 2,
          value: 'value-2',
        },
        {
          id: 3,
          value: 'value-3',
        },
        {
          id: 4,
          value: 'value-4',
        },
        {
          id: 5,
          value: 'value-5',
        },
        {
          id: 6,
          value: 'value-6',
        },
        {
          id: 7,
          value: 'value-7',
        },
        {
          id: 8,
          value: 'value-8',
        },
        {
          id: 9,
          value: 'value-9',
        },
      ];

      const result = addOriginItemIndexToTableData(tableData);

      expect(result).toEqual([
        {
          id: 0,
          value: 'value-0',
          originItemIndex: 0,
        },
        {
          id: 1,
          value: 'value-1',
          originItemIndex: 1,
        },
        {
          id: 2,
          value: 'value-2',
          originItemIndex: 2,
        },
        {
          id: 3,
          value: 'value-3',
          originItemIndex: 3,
        },
        {
          id: 4,
          value: 'value-4',
          originItemIndex: 4,
        },
        {
          id: 5,
          value: 'value-5',
          originItemIndex: 5,
        },
        {
          id: 6,
          value: 'value-6',
          originItemIndex: 6,
        },
        {
          id: 7,
          value: 'value-7',
          originItemIndex: 7,
        },
        {
          id: 8,
          value: 'value-8',
          originItemIndex: 8,
        },
        {
          id: 9,
          value: 'value-9',
          originItemIndex: 9,
        },
      ]);
    });
  });
});
