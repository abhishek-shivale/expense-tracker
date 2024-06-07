import { Receipt } from 'lucide-react'
import React from 'react'

type Props = { selected: boolean }


function Expenses({ selected }: Props) {
  return (
    <Receipt color='white' />
  )
}

export default Expenses