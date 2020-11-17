import React, {useState, useLayoutEffect} from 'react';

export const sizes = {
  small: 760,
  medium: 900,
  large: 1300,
};

type size = 'large' | 'medium' | 'small';

export function useWindowSize(): size {
  let [width, height] = useWindowDimensions();
  //console.log(`Window size: ${width} x ${height}`);
  if (width <= sizes.small) return 'small';
  if (width <= sizes.medium) return 'medium';
  return 'large';
}

export function useWindowDimensions(): number[] {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export function ShowWindowDimensions(props): JSX.Element {
  const [width, height] = useWindowDimensions();
  return (
    <span>
      Window size: {width} x {height}
    </span>
  );
}
