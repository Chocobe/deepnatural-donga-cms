/**
 * 구분자를 기준으로 마지막 문자열 추출
 * @param value 대상 문자열
 * @param delim 구분자
 * @returns 
 */
const extractLastString = (
  value: string,
  delim: string = '_'
) => {
  const regExp = new RegExp(`(.*${delim})?(.*)$`);
  const matcher = value.match(regExp);

  return matcher?.[2]
    ? matcher[2]
    : null;
};

export default extractLastString;
