import Dashboard from '.';
import { act, render, screen } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');

describe('Dashboard', () => {
  beforeEach(() => {
    const dragonsSample = [
      {createdAt: '2021-01-03T22:58:29.625Z', name: 'name1', type: 'type1', histories: 'histories1', id: '1'},
      {createdAt: '2021-01-02T22:58:30.625Z', name: 'name2', type: 'type2', histories: 'histories2', id: '2'},
      {createdAt: '2021-01-01T22:58:31.625Z', name: 'name3', type: 'type2', histories: 'histories3', id: '3'},
    ];
    axios.get.mockResolvedValue({data: dragonsSample});
  });

  it('load dragons when component mount', async () => {
    await act(async () => {
      render(<Dashboard />);
    });

    expect(await screen.findByText('name1')).toBeInTheDocument();
    expect(await screen.findByText('name2')).toBeInTheDocument();
    expect(await screen.findByText('name3')).toBeInTheDocument();
  });

  it('display creation date formatted', async () => {
    await act(async () => {
      render(<Dashboard />);
    });

    expect(await screen.findByText('1/1/2021')).toBeInTheDocument();
    expect(await screen.findByText('1/2/2021')).toBeInTheDocument();
    expect(await screen.findByText('1/3/2021')).toBeInTheDocument();
  });
});