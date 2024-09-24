/**
 * 
 * @returns {{
 *      data: string;
 *      url: string;
 * }}
 *  * `data`: clipboard 에서 읽어온 데이터
 * 
 *  * `url`: clipboard 에서 읽어온 데이터의 ObjectURL
 */
export const readClipboard_util = async () => {
  const clipboardItems = await navigator.clipboard.read();
  const type = clipboardItems[0]?.types?.[0];

  if (!type) {
    return null;
  }

  const data = await clipboardItems[0].getType(type);
  const url = URL.createObjectURL(data);

  return {
    data,
    url,
  };
};
