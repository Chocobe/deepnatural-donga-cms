import extractLastString from './extractLastString';

describe('extractLastString 테스트', () => {
  it('value: "" => null', () => {
    const value = '';

    const result = extractLastString(value);

    expect(result).toBeNull();
  });

  it('value: "first_second" => "second"', () => {
    const value = 'first_second';

    const result = extractLastString(value);

    expect(result).toBe('second');
  });

  it('value: "first__second" => "_second"', () => {
    const value = 'first__second';

    const result = extractLastString(value);

    expect(result).toBe('second');
  });

  it('value: "first_second-third", delim: "-" => "third"', () => {
    const value = 'first_second-third';

    const result = extractLastString(value, '-');

    expect(result).toBe('third');
  });

  it('value: "first_second#third", delim: "#" => "third"', () => {
    const value = 'first_second#third';

    const result = extractLastString(value, '#');

    expect(result).toBe('third');
  });
});
