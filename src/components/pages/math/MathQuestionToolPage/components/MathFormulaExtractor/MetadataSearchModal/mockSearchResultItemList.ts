const createId = (index: number) => {
  const id = index + 1;
  return id < 10
    ? `0${id}`
    : `${id}`;
};

const createValue = (id: string) => {
  return `(mock-${id}) 2015 / MI / 중1-1 빨리 강해지는 수학 - 유형북 (18판형) / 빨리강해지는수학 / 수학 / 1학년 / 1학기`;
};

export const mockSearchResultList = Array.from(
  { length: 20 },
  (_, index) => {
    const id = createId(index);

    return {
      id,
      value: createValue(id),
    };
  }
);
