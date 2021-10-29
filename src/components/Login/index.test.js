import Login from '.'
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Login', () => {
  it('renders a form', () => {
    render(<Login />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('renders a username field', () => {
    render(<Login />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });
  
  it('renders a password field', () => {
    render(<Login />);
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    render(<Login />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it("submit form with the right values", async () => {
    const setUserSpy = jest.fn();
    render(<Login setUser={setUserSpy} />);
    
    userEvent.type(screen.getByLabelText('Username'), 'admin');
    userEvent.type(screen.getByLabelText('Password'), 'admin');

    userEvent.click(screen.getByRole('button', {name: 'Submit'}));
    
    await waitFor(() => {
      expect(setUserSpy).toHaveBeenCalledWith('admin');
    });
  });

  it("shows an error if user doesn't exists", async () => {
    render(<Login setUser={() => {}} />);

    userEvent.type(screen.getByLabelText('Username'), 'John');
    userEvent.type(screen.getByLabelText('Password'), 'Doe');

    userEvent.click(screen.getByRole('button', {name: 'Submit'}));

    await waitFor(() => {
      expect(screen.getByText('No user found for this username/password'))
        .toBeInTheDocument();
    });
  });
});