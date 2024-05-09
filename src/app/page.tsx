import Link from 'next/link'
import { useState } from 'react'

export default function Page() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1>{count}</h1>
      <Link
        href="/about"
        onClick={() => {
          setCount((prv) => prv + 1)
        }}
      >
        About
      </Link>
    </div>
  )
}
