import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Details() {
  const { state } = useLocation()
  return <p>{JSON.stringify(state)}</p>
}
