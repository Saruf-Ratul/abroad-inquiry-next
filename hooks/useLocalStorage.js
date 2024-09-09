import { useEffect, useState } from "react";

const isBrowser = typeof window !== "undefined";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    if (isBrowser) {
      const storedValue = localStorage.getItem(key);
      return storedValue === null ? defaultValue : JSON.parse(storedValue);
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (isBrowser) {
      const listener = (e) => {
        if (e.storageArea === localStorage && e.key === key) {
          setValue(JSON.parse(e.newValue));
        }
      };
      window.addEventListener("storage", listener);

      return () => {
        window.removeEventListener("storage", listener);
      };
    }
  }, [key, defaultValue]);

  const setValueInLocalStorage = (newValue) => {
    setValue((currentValue) => {
      const result =
        typeof newValue === "function" ? newValue(currentValue) : newValue;
      if (isBrowser) {
        localStorage.setItem(key, JSON.stringify(result));
      }
      return result;
    });
  };

  return [value, setValueInLocalStorage];
}
