import { House } from 'lucide-react'
import React from 'react'

type Props = { selected: boolean }


function Home({ selected }: Props) {
  return (
    <House  color='white'  />
  )
}

export default Home
