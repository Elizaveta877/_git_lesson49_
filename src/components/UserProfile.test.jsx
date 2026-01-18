import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserProfile from './UserProfile.jsx';
import '@testing-library/jest-dom';

global.fetch = vi.fn();

describe('UserProfile Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays loading state initially', () => {
  
    fetch.mockReturnValue(new Promise(() => {})); 
    
    render(<UserProfile />);
    
    
    expect(screen.getByText(/loading|завантаження/i)).toBeInTheDocument();
  });

  it('displays user data after successful fetch', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      company: { name: 'Test Co' } 
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    render(<UserProfile />);

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
    });
  });

  it('displays error message on fetch failure', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    render(<UserProfile />);

    await waitFor(() => {
      const errorMessage = screen.getByText(/error|помилка/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});