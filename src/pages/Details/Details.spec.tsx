import { useLocation } from 'react-router-dom'
import { screen } from '@testing-library/react'
import React from 'react'
import Details from './index'

jest.mock('react-router-dom')

it('should render the data from the router', () => {
  // @ts-ignore
  useLocation.mockReturnValue({
    state: {
      name: 'Pranta Dutta',
    },
  })

  // @ts-ignore
  renderWithRouter(<Details />)
  expect(screen.getByText(/Pranta Dutta/i)).toBeInTheDocument()
})
