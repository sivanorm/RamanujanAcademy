import { useState } from "react";

function CounterService() {
  const myNavItems = [
    { name: "Home", id: "hm" },
    { name: "Gallery", id: "gl" },
    { name: "Courses", id: "crs" },
    { name: "About", id: "abt" },
    { name: "Contact", id: "cnt" },
  ];
  const [count, setCount] = useState(0);

  return {
    count,
    setCount,
    increment: () => setCount(count + 1),
    decrement: () => setCount(count - 1),
    GetTabs: () => {
      return myNavItems;
    },
  };
}

export default CounterService;
