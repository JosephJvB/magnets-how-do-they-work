'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'

export default function Nav() {
  const [clientQuery, setClientQuery] = useState<boolean>(false)
  const { data } = useQuery({
    queryKey: ['data', 'user'],
    staleTime: 30 * 1000,
    queryFn: async () => {
      setClientQuery(true)

      await new Promise<void>((r) => setTimeout(r, 300))

      return {
        id: 1,
        name: 'joe',
      }
    },
  })
  return (
    <nav>
      <ul className="flex flex-row">
        <li className="mx-5">
          <Link href="/">home</Link>
        </li>
        <li className="mx-5">
          <Link href="/first">first page</Link>
        </li>
        <li className="mx-5">
          <Link href="/second">second page</Link>
        </li>
      </ul>
      <div>
        {data ? (
          <p>
            logged in user: {data?.id}:{data?.name}
          </p>
        ) : (
          <p>no user</p>
        )}
        <p>sent client query? {clientQuery.toString()}</p>
      </div>
    </nav>
  )
}
