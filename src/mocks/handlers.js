import { rest } from "msw";
import data from "./data.json";

export function chunkArray(arr, chunkSize) {
  let chunkedArrays = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    chunkedArrays.push(chunk);
  }
  return chunkedArrays;
}

export const handlers = [
  rest.get("/jobs/read", (req, res, ctx) => {
    const chunkedArrays = chunkArray(data, 12);
    return res(ctx.delay(1500), ctx.status(200), ctx.json(chunkedArrays));
  }),
  rest.post("/jobs/filter", (req, res, ctx) => {
    let { title, place, isFullTime } = JSON.parse(req.body);
    console.log(title, place, isFullTime);
    function titleCheck(string) {
      let ex = title === "" ? "" : title;
      return String(string).toLowerCase().includes(String(ex).toLowerCase());
    }
    function placeCheck(string) {
      let ex = place === "" ? "" : place;
      return String(string).toLowerCase().includes(String(ex).toLowerCase());
    }
    function fullTimeOnly(string) {
      return isFullTime ? string === "Full Time" : true;
    }
    const filteredData = data.filter((per) => {
      return (
        titleCheck(per.position) &&
        placeCheck(per.location) &&
        fullTimeOnly(per.contract)
      );
    });
    const chunkedArrays = chunkArray(filteredData, 12);
    return res(ctx.json(chunkedArrays), ctx.delay(1500), ctx.status(200));
  }),
];
