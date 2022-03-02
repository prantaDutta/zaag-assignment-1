import React from 'react'
import { screen } from '@testing-library/react'
import PostTable from './index'
import useFetchPosts from '../../hooks/useFetchPosts'

jest.mock('../../hooks/useFetchPosts')

describe('while loading', () => {
  beforeEach(() => {
    // @ts-ignore
    useFetchPosts.mockReturnValue({
      data: null,
      status: 'loading',
    })
  })

  it('renders a circular progress', () => {
    // @ts-ignore
    renderWithRouter(<PostTable />)
    expect(screen.getByRole(/Loader/i)).toBeInTheDocument()
  })
})

describe('while data is loaded', () => {
  beforeEach(() => {
    // @ts-ignore
    useFetchPosts.mockReturnValue({
      data: {
        hits: [
          {
            title: 'This is the title',
            author: 'Pranta Dutta',
            created_at: '2022-03-01T10:12:11.000Z',
            url: 'https://google.com',
          },
        ],
        nbHits: 1986526,
      },
      status: 'idle',
    })
  })

  it('renders the loaded data', () => {
    // @ts-ignore
    renderWithRouter(<PostTable />)
    expect(screen.getByText(/This is the title/i)).toBeInTheDocument()
    expect(screen.getByText(/Pranta Dutta/i)).toBeInTheDocument()
  })
})
