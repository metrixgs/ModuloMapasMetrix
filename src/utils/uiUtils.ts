export const px2mm = (px: number) => {
  const pxPermm = pxPerMM();
  return px / pxPermm;
};

export const pxPerMM = () => {
  const div = document.createElement("div");
  div.style.width = "1mm";
  div.style.height = "1mm";
  div.style.position = "absolute";
  div.style.top = "-1000px";
  document.body.appendChild(div);
  const pxPerMM = div.getBoundingClientRect().width;

  document.body.removeChild(div);
  return pxPerMM;
};
