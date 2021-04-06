/* eslint-disable no-unused-vars */
import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

// afterEach(cleanup)

describe('Header Component', () => {
  test('should display proper text', () => {
    const { getAllByText } = render(<Header />);
    const titleText = getAllByText('Collaborative Document');
  });
});
