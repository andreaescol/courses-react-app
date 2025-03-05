export const getCourseDuration = (courseDuration: number): string => {
  let hh: number = Math.floor(courseDuration / 60);
  let mm: number = courseDuration % 60;
  let timeUnit: string = hh === 1 ? "hour" : "hours";

  let hhStr: string = hh < 10 ? `0${hh}` : hh.toString();
  let mmStr: string = mm < 10 ? `0${mm}` : mm.toString();

  return `${hhStr}:${mmStr} ${timeUnit}`;
};
