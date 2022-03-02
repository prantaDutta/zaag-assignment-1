import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'
import { ReactElement } from 'react'
import { Router } from 'react-router-dom'

export {}

declare global {
  function s<T>(
    someObject: T | null | undefined,
    defaultValue?: T | null | undefined
  ): T
}

const _global = (window /* browser */ || global) /* node */ as any
_global.renderWithRouter = renderWithRouter

function renderWithRouter(renderComponent: ReactElement, route: string) {
  const history = createMemoryHistory()
  if (route) {
    history.push(route)
  }

  return {
    ...render(
      <Router location={history.location} navigator={history}>
        {renderComponent}
      </Router>
    ),
    history,
  }
}
