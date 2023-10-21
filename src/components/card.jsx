import { Link } from "react-router-dom";

export default function Card({ info }) {
  return (
    <li>
      <Link
        to={`/${info.id}`}
        className="relative block rounded-[6px] bg-[#19202D] p-[32px]"
      >
        <span
          className={`absolute top-[-25px] grid aspect-square w-[50px] place-items-center rounded-[15px] bg-black/50 dark:bg-white/10`}
        >
          <img src={info.logo} />
        </span>
        <article>
          <span className=" flex items-baseline gap-[12px] text-[16px] font-normal text-[#aac3e3]">
            {info.postedAt}
            <span className="inline-block h-[3px] w-[3px] rounded-[50%] bg-[#6E8098]"></span>
            {info.contract}
          </span>
          <h2 className="my-[17px] text-[20px] font-bold text-white">
            {info.position}
          </h2>
          <p className="textt-[16px] font-normal text-[#6E8098]">
            {info.company}
          </p>
        </article>
        <span className="mt-[44px] inline-block text-[14px] font-bold leading-normal text-[#5964E0]">
          {info.location}
        </span>
      </Link>
    </li>
  );
}
