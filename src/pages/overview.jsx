import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";
import { readJobs, selectJobs } from "../services/store/jobs";
import Spinner from "../components/loader";
import { useEffect } from "react";

export function loader({ params }) {
  return params.id;
}
export default function OverView() {
  const id = useLoaderData();
  const { status, content } = useSelector(selectJobs);
  const dispatch = useDispatch();
  let data = null;
  let infos;
  if (content) {
    checker: for (const ele of content) {
      if (data) break checker;
      data = ele.filter((per) => per.id == id);
    }
    infos = data[0];
  }
  let UI;
  if (status === "loading") {
    UI = <Spinner />;
  } else if (status === "success") {
    UI = (
      <>
        <Header
          logo={infos.logo}
          link={infos.website}
          company={infos.company}
        />
        <Article info={infos} />
        <a
          href={infos.apply}
          className="mt-[89px] grid h-[48px] w-full place-items-center rounded-[6px] bg-[#5964E0] text-center text-[16px] font-bold leading-normal text-white"
        >
          Apply Now
        </a>
      </>
    );
  }
  useEffect(() => {
    if (status === "idle") {
      dispatch(readJobs());
    }
  }, []);
  return (
    <main className="relative top-[-16px] m-auto max-w-[327px] pb-[23px] md:top-[-40px] md:max-w-[689px]">
      {UI}
    </main>
  );
}

function Header({ logo, link, company }) {
  return (
    <div className="relative flex flex-col items-center rounded-[6px] bg-[#19202D] pb-[32px] pt-[50px] md:flex-row md:items-center md:gap-[40px] md:overflow-hidden md:p-0 md:pr-[40px]">
      <span className="absolute top-[-25px] grid h-[50px] w-[50px] place-items-center rounded-[5px] bg-white/20 md:static md:h-[140px] md:w-[140px] md:self-stretch md:rounded-none">
        <img src={logo} />
      </span>
      <div className="mb-[43px] text-center md:m-0">
        <h2 className="text-[20px] font-bold text-white">{`${company}.com`}</h2>
        <span className="mt-[13px] inline-block text-[16px] font-normal text-[#6E8098]">{`${company}.com`}</span>
      </div>
      <a
        href={link}
        target="_blank"
        className="grid h-[48px] w-[147px] place-items-center rounded-[6px]  bg-[#5964E0] bg-opacity-10 text-center text-[16px] font-bold leading-normal text-[#5964E0] md:ml-auto"
      >
        Company Site
      </a>
    </div>
  );
}

function Article({ info }) {
  return (
    <div className="leaading-[26px] mt-[24px] rounded-[6px] bg-[#19202D] px-[25px] py-[40px] text-[16px] font-normal text-[#9DAEC2]">
      <div>
        <span className=" flex items-baseline gap-[12px] text-[16px] font-normal text-[#aac3e3]">
          {info.postedAt}
          <span className="inline-block h-[3px] w-[3px] rounded-[50%] bg-[#6E8098]"></span>
          {info.contract}
        </span>
        <h2 className="my-[11px] text-[20px] font-bold text-white">
          {info.position}
        </h2>
        <span className="inline-block text-[14px] font-bold leading-normal text-[#5964E0]">
          {info.location}
        </span>

        <a
          href={info.apply}
          className="mb-[32px] mt-[50px] grid h-[48px] w-full place-items-center rounded-[6px] bg-[#5964E0] text-center text-[16px] font-bold leading-normal text-white"
        >
          Apply Now
        </a>
      </div>
      <article>
        <p>{info.description}</p>
        <h3 className="mb-[28px] mt-[40px] text-[20px] font-bold text-white">
          Requirements
        </h3>
        <p>{info.requirements.content}</p>
        <ul className="mt-[32px]">
          {info.requirements.items.map((per) => {
            return (
              <li className="flex items-start gap-[28px] [&_li:last-child]:mb-[0px] [&_li]:mb-[8px]">
                <span className="mt-[6px] inline-block aspect-square w-[4px] flex-shrink-0 rounded-[50%] bg-[#5964E0]"></span>
                {per}
              </li>
            );
          })}
        </ul>
        <h3 className="mb-[28px] mt-[40px] text-[20px] font-bold text-white">
          What You Will Do
        </h3>
        <p>{info.role.content}</p>
        <ol className="mt-[32px] [&_li:last-child]:mb-[0px] [&_li]:mb-[8px]">
          {info.role.items.map((per) => {
            return (
              <li className="flex gap-[28px]">
                <span className="text-[16px] font-bold text-[#5964E0]">
                  {info.role.items.indexOf(per) + 1}
                </span>{" "}
                {per}
              </li>
            );
          })}
        </ol>
      </article>
    </div>
  );
}
