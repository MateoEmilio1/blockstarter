import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import '@testing-library/jest-dom'

jest.mock('@/app/components/AnimatedBackgroundShapes', () => {
  const MockAnimatedBackgroundShapes = () => (
    <div data-testid="animated-background-shapes">AnimatedBackgroundShapes</div>
  )
  MockAnimatedBackgroundShapes.displayName = 'MockAnimatedBackgroundShapes'
  return MockAnimatedBackgroundShapes
})
jest.mock('@/app/components/CoreComponent', () => {
  const MockCoreComponent = () => <div data-testid="core-component">CoreComponent</div>
  MockCoreComponent.displayName = 'MockCoreComponent'
  return MockCoreComponent
})
jest.mock('@/app/components/EventTable', () => {
  const MockEventTable = () => <div data-testid="event-table">EventTable</div>
  MockEventTable.displayName = 'MockEventTable'
  return MockEventTable
})

describe('Home Page', () => {
  test('renders all main components', () => {
    render(<Home />)

    expect(screen.getByTestId('animated-background-shapes')).toBeInTheDocument()
    expect(screen.getByTestId('core-component')).toBeInTheDocument()
    expect(screen.getByTestId('event-table')).toBeInTheDocument()

    const mainContainer = screen.getByRole('main')
    expect(mainContainer).toBeInTheDocument()
  })
})
