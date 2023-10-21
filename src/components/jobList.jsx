import { useState } from "react";
import Card from "./card";

export default function List({ data = [] }) {
  let [page, setPage] = useState(0);
  let [status, setStatus] = useState("idle");
  let renderedData;
  if (data.length > 0) {
    renderedData = data[0].map((per) => {
      return <Card key={per.id} info={per} />;
    });
  } else {
    renderedData = (
      <h1 className="text-center font-bold text-white">No jobs found!</h1>
    );
  }
  let [nodes, setNodes] = useState(renderedData);

  let pagesLeft = Number(data.length - 1 - page);
  function handleNextPage() {
    setStatus("loading");
    setTimeout(() => {
      if (pagesLeft > 0) {
        setPage((prev) => prev + 1);
        let loadedData = data[page].map((per) => {
          return <Card key={per.id} info={per} />;
        });
        setNodes([...nodes, ...loadedData]);
      } else {
        setPage(0);
      }
      setStatus("idle");
    }, 1000);
  }
  return (
    <ul className="mt-[57px] grid gap-[65px_11px] md:mt-[70px] md:grid-cols-2 xl:grid-cols-3 xl:gap-[65px_30px]">
      {nodes}
      <button
        onClick={handleNextPage}
        disabled={pagesLeft <= 0}
        className="m-auto h-[48px] w-[141px] rounded-[5px] bg-[#5964E0] text-[16px] font-bold leading-normal text-white disabled:bg-[#535468] disabled:opacity-20 md:col-span-full"
      >
        {status === "idle"
          ? pagesLeft > 0
            ? "Load More"
            : "No More"
          : "loading..."}
      </button>
    </ul>
  );
}
