import * as React from 'react';

export interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  values: any[];
}
export interface IReturn<T> {
  view: JSX.Element;
  selected: string | number | readonly string[];
}

export function UseSelect<T>({values, ...attrs}: IProps): IReturn<T> {
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
      {values.map((v, i) => (
        <option value={v} key={i}>
          {v}
        </option>
      ))}
    </select>
  );

  return {view, selected};
}
