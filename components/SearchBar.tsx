import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LinkButton from "./LinkButton";

type Props = {
  initialText?: string;
};

const SearchBar = ({ initialText }: Props) => {
  const router = useRouter();
  const [text, setText] = useState(initialText || "");

  useEffect(() => {
    setText((router.query?.searchParam as string) || "");
  }, [router]);

  return (
    <section id="search" className="mt-5 mb-10">
      <div className="flex w-full">
        <input
          placeholder="Server Name / Server IP..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded rounded-tr-none rounded-br-none border border-r-0 border-neutral-700 bg-inherit pt-1.5 pb-1.5 pl-2 pr-2 hover:border-neutral-600 focus:outline focus:outline-blue-500/50"
        ></input>
        <LinkButton
          href={`/${text}`}
          className="rounded-tl-none rounded-bl-none pl-8 pr-8"
          disabled={false}
        >
          Search
        </LinkButton>
      </div>
    </section>
  );
};

export default SearchBar;
