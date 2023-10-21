import Search_SVG from "./SVGs/search";
import Filter_SVG from "./SVGs/filter";
import Place_SVG from "./SVGs/place";
import check_SVG from "../../assets/desktop/icon-check.svg";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";
import { filterJobs, readJobs, selectJobs } from "../services/store/jobs";

export default function Filter() {
  let [filterMenu, setFilterMenu] = useState(false);
  const dispatch = useDispatch();
  const { status } = useSelector(selectJobs);
  const form = useRef();
  let [title, setTitle] = useState("");
  let [place, setPlace] = useState("");
  let [isFullTime, setIsFullTime] = useState(false);
  function sendData() {
    let formData = {
      title,
      place,
      isFullTime,
    };
    dispatch(filterJobs(formData));
  }
  useEffect(() => {
    dispatch(readJobs());
  }, []);
  return (
    <Form
      method="POST"
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center rounded-[5px] bg-[#19202D] px-[16px] md:items-stretch md:p-0 md:pr-[16px]"
    >
      <div className="flex flex-grow items-center gap-[16px] self-stretch md:flex-grow-0 md:pl-[24px]">
        <label
          htmlFor="title"
          className="hidden cursor-pointer text-[#5964E0] md:inline-block"
        >
          <Search_SVG />
        </label>
        <input
          type="text"
          name="title"
          id="title"
          onInput={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Filter by title..."
          className="self-stretch bg-transparent text-[16px] font-normal leading-normal text-white outline-none placeholder-shown:opacity-50 md:max-w-[159px] xl:w-[392px] xl:max-w-none"
        />
      </div>
      <div className="hidden items-center gap-[16px] border-l border-[#6E8098] border-opacity-20 pl-[24px] md:flex">
        <label
          htmlFor="place"
          className="hidden cursor-pointer text-[#5964E0] md:inline-block"
        >
          <Place_SVG />
        </label>
        <input
          type="text"
          name="title"
          id="place"
          onInput={(e) => setPlace(e.target.value)}
          value={place}
          placeholder="Filter by location..."
          className="self-stretch bg-transparent text-[16px] font-normal leading-normal text-white outline-none placeholder-shown:opacity-50 md:max-w-[157px] xl:w-[245px] xl:max-w-none"
        />
      </div>
      <div className="hidden items-center border-l border-[#6E8098] border-opacity-20 pl-[20px] md:flex">
        <label
          htmlFor="isFullTime"
          className="relative flex cursor-pointer  items-start gap-[16px]"
        >
          <input
            type="checkbox"
            className="peer pointer-events-none absolute h-0 w-0 opacity-0"
            checked={isFullTime}
            onInput={(e) => {
              setIsFullTime(!isFullTime);
            }}
            id="isFullTime"
          />
          <span className="grid aspect-square w-[24px] place-items-center rounded-[3px] bg-white/10 peer-checked:bg-[#5964E0] [&_img]:hidden peer-checked:[&_img]:block">
            <img src={check_SVG} alt="" />
          </span>
          <span className="text-[16px] font-bold text-white [user-select:none]">
            Full Time
          </span>
        </label>
      </div>
      {filterMenu && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 md:hidden"
          onClick={(e) => {
            setFilterMenu(false);
          }}
        >
          <div
            className="w-[327px] rounded-[6px] bg-[#19202D] py-[24px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-[16px] border-b border-[#6E8098] border-opacity-[0.2] px-[24px] pb-[24px]">
              <label htmlFor="place">
                <Place_SVG />
              </label>
              <input
                className="flex-grow bg-transparent text-[16px] font-normal leading-normal text-white outline-none placeholder-shown:opacity-50"
                type="text"
                id="place"
                placeholder="Filter by location…"
                value={place}
                onInput={(e) => {
                  setPlace(e.target.value);
                }}
              />
            </div>

            <div className="grid gap-[24px] px-[24px] pt-[24px] text-[16px]  font-bold leading-normal text-white">
              <label
                htmlFor="isFullTime"
                className="relative flex cursor-pointer  items-start gap-[16px]"
              >
                <input
                  type="checkbox"
                  className="peer pointer-events-none absolute h-0 w-0 opacity-0"
                  checked={isFullTime}
                  onInput={(e) => {
                    setIsFullTime(!isFullTime);
                  }}
                  id="isFullTime"
                />
                <span className="grid aspect-square w-[24px] place-items-center rounded-[3px] bg-white/10 peer-checked:bg-[#5964E0] [&_img]:hidden peer-checked:[&_img]:block">
                  <img src={check_SVG} alt="" />
                </span>
                <span className="[user-select:none]">Full Time Only</span>
              </label>
              <button
                className="h-[48px] rounded-[5px] bg-[#5964E0]"
                onClick={(e) => {
                  sendData();
                  setFilterMenu(false);
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-stretch py-[16px] md:hidden">
        <button
          type="button"
          onClick={(e) => setFilterMenu(!filterMenu)}
          className="aspect-square h-[48px] text-white"
        >
          <Filter_SVG />
        </button>
        <button
          type="button"
          onClick={sendData}
          className="grid aspect-square h-[48px] place-items-center rounded-[5px] bg-[#5964E0] text-white"
        >
          <Search_SVG />
        </button>
      </div>
      <button
        type="button"
        onClick={sendData}
        className="ml-auto hidden aspect-square h-[48px] place-items-center rounded-[5px] bg-[#5964E0] font-bold text-white md:my-[16px] md:grid md:aspect-auto md:w-[80px] xl:w-[123px]"
      >
        Search
      </button>
    </Form>
  );
}
