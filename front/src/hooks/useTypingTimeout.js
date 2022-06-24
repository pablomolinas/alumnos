import { useEffect } from 'react';
import { useState } from 'react'

const useTypingTimeout = (delay = 5000) => {
  const [isTyping, setIsTyping] = useState(false);
  const [timer, setTimer] = useState(0);
  

  useEffect(() => { return () => stopTyping() }, []);

  const setTyping = (task) => {
    if(timer){
      clearTimeout(timer);
    }

    setIsTyping(true);
    setTimer(setTimeout(() => {
      task();
      setIsTyping(false);
    }, delay));
  }

  const stopTyping = () => {
    if(timer) clearTimeout(timer);
    setIsTyping(false);
  }
  
  return [
    isTyping,

    setTyping,
    stopTyping,
  ]
}

export default useTypingTimeout
