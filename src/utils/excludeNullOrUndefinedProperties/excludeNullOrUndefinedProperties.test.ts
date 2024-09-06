import excludeNullOrUndefinedProperties from './excludeNullOrUndefinedProperties';

describe('excludeNullOrUndefinedProperties 테스트', () => {
  it('{} => {}', () => {
    const obj = {};

    const result = excludeNullOrUndefinedProperties(obj);

    expect(result).toEqual({});
  });

  it('{ a: null } => {}', () => {
    const obj = {
      a: null,
    };

    const result = excludeNullOrUndefinedProperties(obj);

    expect(result).toEqual({});
  });

  it('{ a: undefined } => {}', () => {
    const obj = {
      a: undefined,
    };

    const result = excludeNullOrUndefinedProperties(obj);

    expect(result).toEqual({});
  });

  it('{ a: 1, b: null } => { a: 1 }', () => {
    const obj = {
      a: 1,
      b: null,
    };

    const result = excludeNullOrUndefinedProperties(obj);

    expect(result).toEqual({
      a: 1,
    });
  });

  it('{ a: null, b: 2 } => { b: 2 }', () => {
    const obj = {
      a: null,
      b: 2,
    };

    const result = excludeNullOrUndefinedProperties(obj);

    expect(result).toEqual({
      b: 2,
    });
  });

  it('{ a: true, b: undefined, c: false } => { a: true, c: false }', () => {
    const obj = {
      a: true,
      b: undefined,
      c: false,
    };

    const result = excludeNullOrUndefinedProperties(obj);

    expect(result).toEqual({
      a: true,
      c: false,
    });
  });

  it('{ a: undefined, b: {} } => { b: {} }', () => {
    const obj = {
      a: undefined,
      b: {},
    };

    const result = excludeNullOrUndefinedProperties(obj);

    expect(result).toEqual(result);
  });

  it('{ a: false, b: { b1: "value1", b2: null, b3: undefined } } => { a: false, b: { b1: "value1" } }', () => {
    const obj = {
      a: false,
      b: {
        b1: 'value1',
        b2: null,
        b3: undefined,
      },
    };

    const result = excludeNullOrUndefinedProperties(obj);

    expect(result).toEqual({
      a: false,
      b: {
        b1: 'value1',
      },
    });
  });

  it('{ a: { b1: 1, b2: null, b3: { c1: null, c2: "hello", c3: undefined, c4: "world" } } } => { a: { b1: 1, b3: { c2: "hello", c4: "world" } } }', () => {
    const obj = {
      a: {
        b1: 1,
        b2: null,
        b3: {
          c1: null,
          c2: 'hello',
          c3: undefined,
          c4: 'world',
        },
      },
    };

    const result = excludeNullOrUndefinedProperties(obj);

    expect(result).toEqual({
      a: {
        b1: 1,
        b3: {
          c2: 'hello',
          c4: 'world',
        },
      },
    });
  });

  it('{ a: [1, 2, 3], b: null, c: undefined, d: "HelloWorld" } => { a: [1, 2, 3], d: "HelloWorld" }', () => {
    const obj = {
      a: [1, 2, 3],
      b: null,
      c: undefined,
      d: 'HelloWorld',
    };

    const result = excludeNullOrUndefinedProperties(obj);

    expect(Array.isArray(result.a)).toBeTruthy();
    expect(result).toEqual({
      a: [1, 2, 3],
      d: 'HelloWorld',
    });
  });

  it('{ a: [{ a1: undefined, a2: "hello", a3: null }], b: "world" } => { a: [{ a2: "hello" }], b: "world" }', () => {
    const obj = {
      a: [
        {
          a1: undefined,
          a2: 'hello',
          a3: null,
        },
      ],
      b: 'world',
    };

    const result = excludeNullOrUndefinedProperties(obj);

    expect(result).toEqual({
      a: [
        {
          a2: 'hello',
        },
      ],
      b: 'world',
    });
  });
});
