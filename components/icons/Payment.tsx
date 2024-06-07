import { CreditCard } from 'lucide-react'
import React from 'react'

type Props = { selected: boolean }

function Payment({ selected }: Props) {
  return (
    <CreditCard  color='white' />
  )
}

export default Payment