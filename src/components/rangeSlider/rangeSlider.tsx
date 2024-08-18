"use client";

import clsx from "clsx";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { interpolation } from "@/utils/number";
import "./styles.css";

type NumString = string | number;

type RangeInputProps = {
  primaryAccent?: string;
  secondaryAccent?: string;
  value: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  minValue?: number;
  maxValue?: number;
  className?: string;
  showLimits?: boolean;
};

export const RangeSlider = (props: RangeInputProps) => {
  const {
    primaryAccent = "#38bdf8",
    secondaryAccent = "#0284c7",
    value,
    onChange,
    minValue,
    maxValue,
    className,
  } = props;

  const [grandient, setGrandient] = useState(
    "linear-gradient(to right, #d4d4d8 0%, #d4d4d8 0%, #d4d4d8 0%, #d4d4d8 100%)"
  );

  const updateRangeGradient = useCallback(
    (currentValue: NumString) => {
      const percentage = interpolation({
        value: Number(currentValue),
        min: minValue ?? 0,
        max: maxValue ?? 1,
      });
      const gradient = `linear-gradient(to right, ${secondaryAccent} 0%, ${primaryAccent} ${percentage}%, #d4d4d8 ${percentage}%, #d4d4d8 100%)`;
      console.log("gradient", gradient);
      setGrandient(gradient);
    },
    [minValue, maxValue, secondaryAccent, primaryAccent]
  );

  useEffect(() => {
    updateRangeGradient(value);
  }, [value]);

  return (
    <div className="relative w-full">
      <input
        style={{
          background: grandient,
        }}
        className={clsx(
          "w-full h-2 rounded-lg cursor-pointer transition-all range-slider shadow-lg",
          className
        )}
        type="range"
        min={minValue}
        max={maxValue}
        value={value}
        onChange={(event) => {
          onChange?.(event);
          updateRangeGradient(event.target.value);
        }}
      />
    </div>
  );
};
