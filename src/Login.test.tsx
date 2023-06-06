import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './component/Login';

describe('Login component', () => {
  test('renders login form', () => {
    render(<Login />);
  
    // Assert that the login form elements are rendered
    expect(screen.getByLabelText('Your email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });
  
  test('submits form with email and password', () => {
    render(<Login />);
  
    // Simulate user input
    userEvent.type(screen.getByLabelText('Your email'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password'), 'password123');
  
    // Simulate form submission
    userEvent.click(screen.getByRole('button', { name: 'Sign in' }));
  
    // Assert that form submission logic is triggered
    // Add your assertions here
  });
});
