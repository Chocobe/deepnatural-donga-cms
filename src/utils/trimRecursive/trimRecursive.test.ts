import trimRecursive from './trimRecursive';

describe('trimRecursive 테스트', () => {
  it('"Hello" => "Hello"', () => {
    const value = 'Hello';

    const result = trimRecursive(value);

    expect(result).toBe('Hello');
  });

  it('"Hello " => "Hello"', () => {
    const value = 'Hello ';

    const result = trimRecursive(value);

    expect(result).toBe('Hello');
  });

  it('" Hello" => "Hello"', () => {
    const value = ' Hello';

    const result = trimRecursive(value);

    expect(result).toBe('Hello');
  });

  it('{ a: "Hello ", b: " World" } => { a: "Hello", b: "World" }', () => {
    const value = {
      a: 'Hello ',
      b: ' World',
    };

    const result = trimRecursive(value);

    expect(result).toEqual({
      a: 'Hello',
      b: 'World',
    });
  });

  it('{ a: [{ a1: "  Hello ", a2: " World   " }] } => { a: [{ a1: "Hello", a2: "World" }] }', () => {
    const value = {
      a: [
        {
          a1: '  Hello ',
          a2: ' World   ',
        },
      ],
    };

    const result = trimRecursive(value);

    expect(result).toEqual(result);
  });

  it('123 => 123 (number)', () => {
    const value = 123;

    const result = trimRecursive(value);

    expect(typeof result).toBe('number');
    expect(result).toBe(123);
  });

  it('true => true', () => {
    const value = true;

    const result = trimRecursive(value);

    expect(result).toBeTruthy();
  });
});
