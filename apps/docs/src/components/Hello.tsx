import { useEffect, useState } from "react"

export function Hello() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    }
  }, [])

  return (
    <div className="bg-amber-900">Hello {count}</div>
  )
}
