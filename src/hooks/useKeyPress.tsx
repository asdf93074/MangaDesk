import { useEffect, useRef } from 'react';

export default function useKeyPress(keyCode: string) {
  return function doForKey(action: () => any) {
    const savedCallback = useRef<any>();

    savedCallback.current = action;

    const doActionIfKeyCodeMatches = (event: KeyboardEvent) => {
      if (keyCode === event.keyCode.toString()) savedCallback.current();
    };

    useEffect(() => {
      window.addEventListener('keydown', doActionIfKeyCodeMatches);

      return () => {
        window.removeEventListener('keydown', doActionIfKeyCodeMatches);
      };
    }, []);
  };
}
