import { render, screen } from '@testing-library/react';
import { LiquidGlassSurface } from './src/components/LiquidGlassSurface';

test('renders liquid glass surface', () => {
  render(<LiquidGlassSurface>Test</LiquidGlassSurface>);
  expect(screen.getByText('Test')).toBeInTheDocument();
});
