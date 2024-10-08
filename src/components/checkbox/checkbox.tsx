import React from "react";
import "./styles.css";

type CheckboxProps = {
  id: string;
  label: string;
};

export const Checkbox = (
  props: CheckboxProps & React.InputHTMLAttributes<HTMLInputElement>
) => {
  const { id, label, ...inputProps } = props;
  return (
    <div className="checkbox-wrapper-46 text-slate-300/80">
      <input type="checkbox" id={id} className="inp-cbx" {...inputProps} />
      <label htmlFor={id} className="cbx">
        <span>
          <svg viewBox="0 0 12 10" height="10px" width="12px">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </span>
        <span>{label}</span>
      </label>
    </div>
  );
};
