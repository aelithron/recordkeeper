import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '@/app/page'

describe('Home', () => {
  it('renders the page with a heading and Markdown content', () => {
    render(<Page />)

    // Check for the Markdown content
    expect(screen.getByText(/The wiki has no `index.md` file!/)).not.toBeInTheDocument()
    expect(screen.getByText(/This is an error, please create one!/)).not.toBeInTheDocument()
  })
})