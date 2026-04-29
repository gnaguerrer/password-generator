"use client";

import { useEffect, useState } from "react";
import {
  ArrowPathIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { Checkbox } from "@/components/checkbox/checkbox";
import { GithubIcon, RangeSlider } from "@/components";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

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

const charset = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=",
};

type Mode = "random" | "pin";

interface PasswordOptions {
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export default function Home() {
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<Mode>("random");
  const [options, setOptions] = useState<Partial<PasswordOptions>>({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
  });
  const [length, setLength] = useState(10);
  const [copying, setCopying] = useState(false);
  const [customSymbols, setCustomSymbols] = useState(charset.symbols);

  const onGeneratePassword = () => {
    if (mode === "pin") {
      const result = Array.from(
        { length },
        () => charset.numbers[Math.floor(Math.random() * charset.numbers.length)]
      ).join("");
      setPassword(result);
      return result;
    }

    let characters = "";
    const guaranteed: string[] = [];

    (Object.keys(charset) as (keyof typeof charset)[]).forEach((key) => {
      const chars = key === "symbols" ? customSymbols : charset[key];
      if (options[key] && chars.length > 0) {
        characters += chars;
        guaranteed.push(chars[Math.floor(Math.random() * chars.length)]);
      }
    });

    const remaining = Array.from({ length: length - guaranteed.length }, () =>
      characters[Math.floor(Math.random() * characters.length)]
    );

    const shuffled = [...guaranteed, ...remaining].sort(() => Math.random() - 0.5);
    const password = shuffled.join("");

    setPassword(password);
    return password;
  };

  useEffect(() => {
    onGeneratePassword();
  }, []);

  useEffect(() => {
    onGeneratePassword();
  }, [mode, options, length, customSymbols]);

  const onCheckboxChange = (id: keyof PasswordOptions, checked: boolean) => {
    setOptions((prev) => {
      const updatedOptions = { ...prev, [id]: checked };

      const isAtLeastOneTrue = Object.values(updatedOptions).some(Boolean);

      if (!isAtLeastOneTrue) {
        return prev;
      }

      return updatedOptions;
    });
  };

  const getStrength = (): { level: number; label: string; color: string } => {
    if (mode === "pin") {
      if (length <= 4) return { level: 1, label: "Weak", color: "bg-red-500" };
      if (length <= 6) return { level: 2, label: "Fair", color: "bg-orange-400" };
      if (length <= 8) return { level: 3, label: "Good", color: "bg-yellow-400" };
      return { level: 4, label: "Strong", color: "bg-green-500" };
    }

    const activeTypes = Object.values(options).filter(Boolean).length;
    let score = 0;
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (activeTypes >= 2) score++;
    if (activeTypes >= 3) score++;
    if (activeTypes >= 4) score++;

    if (score <= 1) return { level: 1, label: "Weak", color: "bg-red-500" };
    if (score <= 2) return { level: 2, label: "Fair", color: "bg-orange-400" };
    if (score <= 3) return { level: 3, label: "Good", color: "bg-yellow-400" };
    return { level: 4, label: "Strong", color: "bg-green-500" };
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    setCopying(true);
    setTimeout(() => {
      setCopying(false);
    }, 1500);
  };

  return (
    <main className="flex h-screen flex-col items-center justify-between pt-16 px-4 lg:px-0 lg:pt-36 w-full bg-slate-900">
      <div className="border border-sky-500/60 px-4 py-6 rounded-md bg-deep-ocean-darkBlue flex flex-col items-center w-full lg:w-auto">
        <Image
          src="/lock.png"
          alt="lock-logo"
          sizes="100vw"
          className="w-20 h-20 mb-5"
          width="0"
          height="0"
        />
        <h1 className="flex flex-col w-full text-sky-500 text-xl">
          Password Generator
        </h1>
        <h5 className="flex flex-col w-full text-sky-500 text-sm lg:text-md pb-5">
          Create a secure password with customizable options.
        </h5>

        <div className="flex w-full rounded-md overflow-hidden border border-sky-500/40 mb-4">
          <button
            className={clsx(
              "flex-1 py-1.5 text-sm transition-all",
              mode === "random"
                ? "bg-sky-500 text-white"
                : "text-slate-400 hover:text-slate-300"
            )}
            onClick={() => setMode("random")}
          >
            Random
          </button>
          <button
            className={clsx(
              "flex-1 py-1.5 text-sm transition-all",
              mode === "pin"
                ? "bg-sky-500 text-white"
                : "text-slate-400 hover:text-slate-300"
            )}
            onClick={() => setMode("pin")}
          >
            PIN
          </button>
        </div>

        <div className="text-slate-300 border border-slate-400 rounded-lg w-full px-2 py-3 flex justify-between items-center lg:w-[500px] gap-3">
          <p className="cursor-text w-full hover:text-slate-200 transition-all text-3xl overflow-x-auto text-nowrap overflow-y-hidden scrollbar-text">
            {password}
          </p>
          <div className="flex gap-2.5">
            <div className="relative group inline-block">
              <button
                className="text-slate-400 hover:text-slate-300 transition-all relative"
                onClick={handleCopy}
              >
                <DocumentDuplicateIcon className="w-7" />
              </button>
              <div
                className={clsx(
                  "absolute items-center justify-center px-3 py-1 text-sm  text-white bg-sky-500 rounded-lg shadow-lg whitespace-nowrap",
                  "bottom-full mb-2 left-1/2 transform -translate-x-1/2 transition-opacity duration-200",
                  copying ? "opacity-100 visible" : "opacity-0 invisible"
                )}
              >
                Copied!
                <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-sky-500 rotate-45"></div>
              </div>
            </div>

            <button
              className="text-slate-400 hover:text-slate-300 transition-all"
              onClick={onGeneratePassword}
            >
              <ArrowPathIcon className="w-7" />
            </button>
          </div>
        </div>
        {(() => {
          const { level, label, color } = getStrength();
          return (
            <div className="flex items-center gap-3 w-full mt-2">
              <div className="flex gap-1 flex-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={clsx(
                      "h-1.5 flex-1 rounded-full transition-all duration-300",
                      i <= level ? color : "bg-slate-700"
                    )}
                  />
                ))}
              </div>
              <span className={clsx("text-xs font-medium w-12 text-right transition-all", {
                "text-red-500": level === 1,
                "text-orange-400": level === 2,
                "text-yellow-400": level === 3,
                "text-green-500": level === 4,
              })}>
                {label}
              </span>
            </div>
          );
        })()}
        <div className="w-full mt-3">
          <div className="w-full flex justify-between items-center">
            <span className="text-base text-slate-300/80">
              {mode === "pin" ? "PIN length" : "Character length"}
            </span>
            <span className="text-3xl text-sky-500 font-semibold">
              {length}
            </span>
          </div>
          <RangeSlider
            value={length}
            minValue={4}
            maxValue={24}
            onChange={(event) => {
              setLength(Number(event.target.value));
            }}
          />
        </div>
        {mode === "random" && (
          <div className="py-4 w-full px-2 gap-2 flex flex-col">
            {checkInputs.map((item) => (
              <div key={item.id} className="flex flex-col gap-1.5">
                <Checkbox
                  id={item.id}
                  label={item.label}
                  checked={Boolean(options?.[item.id as keyof PasswordOptions])}
                  onChange={(event) => {
                    onCheckboxChange(
                      item.id as keyof PasswordOptions,
                      event.target.checked
                    );
                  }}
                />
                {item.id === "symbols" && options.symbols && (
                  <input
                    type="text"
                    value={customSymbols}
                    onChange={(e) => setCustomSymbols(e.target.value)}
                    placeholder="Enter special characters..."
                    className="ml-7 bg-transparent border border-slate-600 rounded px-2 py-1 text-slate-300 text-sm focus:outline-none focus:border-sky-500 transition-all placeholder:text-slate-600"
                  />
                )}
              </div>
            ))}
          </div>
        )}
        <button
          className={clsx(
            "text-slate-200 transition-all bg-sky-500/80 hover:bg-sky-500/90 py-2 w-full rounded-md text-xl",
            mode === "pin" && "mt-4"
          )}
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
          Made with{" "}
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
