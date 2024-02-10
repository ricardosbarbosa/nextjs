'use client'
import { Button } from '@mantine/core'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

type Props = {}

export default function Client({}: Props) {
  const session = useSession()
  return (
    <div>Client
<Button onClick={() => signOut()} >Sign out</Button>
      <pre>
        {JSON.stringify(session, null, 2)}
      </pre>

    </div>
  )
}