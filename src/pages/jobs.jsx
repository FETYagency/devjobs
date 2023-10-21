import { useSelector } from "react-redux";
import Filter from "../components/Filter";
import List from "../components/jobList";
import { selectJobs } from "../services/store/jobs";
import Spinner from "../components/loader";
export default function Jobs() {
  const { status, content } = useSelector(selectJobs);
  let element;
  if (status === "loading") {
    element = <Spinner />;
  } else if (status === "success") {
    element = <List data={content} />;
  }
  return (
    <main className="relative top-[-40px] m-auto max-w-[327px] md:max-w-[689px] xl:max-w-[1110px]">
      <Filter />
      {element}
    </main>
  );
}
