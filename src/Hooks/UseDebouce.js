import { useEffect, useRef, useState } from "react";

export default function useDebounce(value ,delay){
    const [debounceValue ,setDebounceValue] =useState('');
    const timerRef = useRef();
    useEffect(() =>{
        if(timerRef.current){
            clearTimeout(timerRef.current)
            }
             timerRef.current = setTimeout(() =>{
                      setDebounceValue(value);
             },delay);
    } ,[value ,delay]);
    return debounceValue;
}