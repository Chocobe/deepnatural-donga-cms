export const createImgOuterHTML = (params: {
    src: string;
    alt: string;
}) => {
  const {
    src,
    alt,
  } = params;

  const imgTag = document.createElement('img') as HTMLImageElement;
  imgTag.src = src;
  imgTag.alt = alt;

  const outerHTML = imgTag.outerHTML + '</img>';

  return /<\/|\/>$/.test(outerHTML)
    ? outerHTML
    : outerHTML + '</img>';
};
