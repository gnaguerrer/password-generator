"use client";

import { useState } from "react";
import {
  ArrowPathIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { Checkbox } from "@/components/checkbox/checkbox";
import { GithubIcon, RangeSlider } from "@/components";
import Link from "next/link";

const checkInputs = [
  {
    id: "uppercase",
    label: "Include Uppercase letters",
  },
  {
    id: "lowercase",
    label: "Include Lowercase letters",
  },
  {
    id: "numbers",
    label: "Include Numbers",
  },
  {
    id: "symbols",
    label: "Include Symbols",
  },
];

export default function Home() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const onGeneratePassword = () => {};

  return (
    <main className="flex h-screen flex-col items-center justify-between pt-16 px-4 lg:px-0 lg:pt-36 w-full bg-ebony-clay-950">
      <div className="border border-sky-500/60 px-4 py-6 rounded-md bg-deep-ocean-darkBlue flex flex-col items-center w-full lg:w-auto">
        <h1 className="flex flex-col w-full text-sky-500 text-xl">
          Password Generator
        </h1>
        <h5 className="flex flex-col w-full text-sky-500 text-sm lg:text-md pb-5">
          Create a secure password with customizable options.
        </h5>

        <div className="text-slate-300 border border-slate-400 rounded-lg w-full px-2 py-3 flex justify-between items-center lg:w-[450px] gap-10">
          <p className="cursor-text w-full hover:text-slate-200 transition-all text-3xl">
            {password}
          </p>
          <div className="flex gap-2.5">
            <button
              className="text-slate-400 hover:text-slate-300 transition-all"
              onClick={() => {
                navigator.clipboard.writeText(password);
              }}
            >
              <DocumentDuplicateIcon className="w-7" />
            </button>
            <button
              className="text-slate-400 hover:text-slate-300 transition-all"
              onClick={onGeneratePassword}
            >
              <ArrowPathIcon className="w-7" />
            </button>
          </div>
        </div>
        <div className="w-full mt-3">
          <div className="w-full flex justify-between items-center">
            <span className="text-basee text-slate-300/80">
              Character length
            </span>
            <span className="text-3xl text-sky-500 font-semibold">
              {length}
            </span>
          </div>
          <RangeSlider
            value={length}
            minValue={8}
            maxValue={24}
            onChange={(event) => {
              setLength(Number(event.target.value));
            }}
          />
        </div>
        <div className="py-4 w-full px-2 gap-2 flex flex-col">
          {checkInputs.map((item) => (
            <Checkbox key={item.id} id={item.id} label={item.label} />
          ))}
        </div>
        <button
          className="text-slate-200 transition-all bg-sky-500/80 hover:bg-sky-500/90 py-2 w-full rounded-md text-xl"
          onClick={onGeneratePassword}
        >
          Generate
        </button>
      </div>
      <footer className="flex items-center flex-col pt-4 pb-4 text-slate-200/70 w-full">
        <span
          id="footer-container"
          className="mt-3 text-sm flex items-center px-4"
        >
          Made with
          <span id="heart-icon" className="px-2 heart-icon transition-all">
            ❤️
          </span>
          by
          <Link
            className="ml-1 underline hover:text-slate-100 flex items-center gap-1 fill-slate-200/70 hover:fill-slate-100 transition-all"
            href="https://github.com/gnaguerrer"
            target="_blank"
          >
            <GithubIcon />
            Gina Guerrero
          </Link>
        </span>
      </footer>
    </main>
  );
}
