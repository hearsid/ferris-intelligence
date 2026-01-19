import { render } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a welcome message', () => {
    const { getAllByText } = render(<App />);
    expect(
      getAllByText(new RegExp('Welcome to Our Platform', 'gi')).length > 0,
    ).toBeTruthy();
  });
});
