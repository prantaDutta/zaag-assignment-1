import React from 'react'
import { render, screen } from '@testing-library/react'
import { Home } from './index'

jest.mock('../../components/PostTable', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>This is the table</div>
    },
  }
})

it('should render "Hello world" in Home', () => {
  render(<Home />)
  expect(screen.getByText('Sample Assignment -1 (Blogs)')).toBeInTheDocument()
})
