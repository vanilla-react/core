import { useState } from 'react';

export function useTabs(
  initialValue: number,
): [number, React.Dispatch<React.SetStateAction<number>>] {
  const [state, setState] = useState(initialValue);

  return [state, setState];
}
