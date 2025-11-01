import { useState, useEffect } from "react";

export function useTypewriter(fullText, speed = 30) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if(!fullText) return;
    
    setDisplayText("");
    let i = 0;

    const interval = setInterval(() => {
      setDisplayText(prev => prev + fullText.charAt(i));
      i++;

      if (i >= fullText.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [fullText, speed]);

  return displayText;
}
