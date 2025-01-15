/* eslint-disable @typescript-eslint/no-explicit-any */
import convertFromObjects, { Row } from 'lib/convert-from-objects.ts';

describe('convertFromObjects', () => {
  it('should return empty columns and rows when input data is empty', () => {
    const result = convertFromObjects([]);
    expect(result).toEqual({ column: [], rows: [] });
  });

  it('should return empty columns and rows when the first row is undefined', () => {
    const result = convertFromObjects([undefined as any]);
    expect(result).toEqual({ column: [], rows: [] });
  });

  it('should correctly convert data from objects to arrays', () => {
    const inputData: Row[] = [
      { name: 'Alice', age: '25', city: 'New York' },
      { name: 'Bob', age: '30', city: 'Los Angeles' },
    ];

    const result = convertFromObjects(inputData);

    expect(result.column).toEqual(['name', 'age', 'city']);
    expect(result.rows).toEqual([
      ['Alice', '25', 'New York'],
      ['Bob', '30', 'Los Angeles'],
    ]);
  });

  it('should handle rows with missing values gracefully', () => {
    const inputData: Row[] = [
      { name: 'Alice', age: '25' },
      { name: 'Bob', city: 'Los Angeles' },
    ];

    const result = convertFromObjects(inputData);

    expect(result.column).toEqual(['name', 'age', 'city']);
    expect(result.rows).toEqual([
      ['Alice', '25', ''],
      ['Bob', '', 'Los Angeles'],
    ]);
  });

  it('should handle rows with empty strings as values', () => {
    const inputData: Row[] = [
      { name: '', age: '25', city: '' },
      { name: 'Bob', age: '', city: 'Los Angeles' },
    ];

    const result = convertFromObjects(inputData);

    expect(result.column).toEqual(['name', 'age', 'city']);
    expect(result.rows).toEqual([
      ['', '25', ''],
      ['Bob', '', 'Los Angeles'],
    ]);
  });
});
