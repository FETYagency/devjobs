import pattern_desk from "../../assets/desktop/bg-pattern-header.svg";
import pattern_mobile from "../../assets/mobile/bg-pattern-header.svg";
import pattern_tablet from "../../assets/tablet/bg-pattern-header.svg";
import sun from "../../assets/desktop/icon-sun.svg";
import moon from "../../assets/desktop/icon-moon.svg";
import logo from "../../assets/desktop/logo.svg";
import { toggle, subscriber, getSnapshot } from "../utils/toggleTheme";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useSelector } from "react-redux";
import { selectJobs } from "../services/store/jobs";
export default function Header() {
  let sync = useSyncExternalStore(subscriber, getSnapshot);
  let [currentTheme, setCurrentTheme] = useState(sync);
  const { status, content } = useSelector(selectJobs);
  let nextTheme = currentTheme === "dark" ? "light" : "dark";
  useEffect(() => {
    toggle();
  }, []);
  function handleToglleTheme(e) {
    toggle(nextTheme);
    setCurrentTheme(nextTheme);
  }
  return (
    <header className="grid grid-cols-1">
      <picture className="col-start-1 row-start-1 block h-[136px] w-full md:h-[160px]">
        <source media="(min-width: 1280px)" srcSet={pattern_desk} />
        <source media="(min-width: 768px)" srcSet={pattern_tablet} />
        <img src={pattern_mobile} className="h-full w-full object-cover" />
      </picture>
      <div className="col-start-1 row-start-1 mx-auto flex w-full max-w-[327px] justify-between self-start pt-[32px] md:max-w-[689px] xl:max-w-[1110px]">
        <span className="">
          <img src={logo} />
        </span>
        <div className="flex items-center gap-[16px]">
          <span>
            <img src={sun} />
          </span>
          <button
            className=" h-[24px] w-[48px] rounded-[12px] bg-white p-[5px]"
            onClick={(e) => handleToglleTheme(e)}
          >
            <span className="pointer-events-none block aspect-square h-full rounded-[50%] bg-[#5964E0] dark:translate-x-[24px]"></span>
          </button>
          <span>
            <img src={moon} />
          </span>
        </div>
      </div>
    </header>
  );
}
