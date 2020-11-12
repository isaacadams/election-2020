import * as React from 'react';

export interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[] | JSX.Element[];
}
export interface IReturn {
  view: JSX.Element;
  selected: string | number | readonly string[];
}

function isString(option: string | JSX.Element): option is string {
  return (option as JSX.Element).props === undefined;
}

export function UseSelect({options, ...attrs}: IProps): IReturn {
  if (options.filter(isString)?.length > 0) {
    options = (options as Array<string>).map((v, i) => (
      <option value={v} key={i}>
        {v}
      </option>
    ));
  }

  let {defaultValue, ...restAttrs} = attrs;
  let [selected, setSelected] = React.useState<
    string | number | readonly string[]
  >(defaultValue);

  let view = (
    <select
      {...restAttrs}
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
    >
      {options}
    </select>
  );

  return {view, selected};
}
