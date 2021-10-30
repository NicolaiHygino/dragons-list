import Dashboard from '.';
import { act, cleanup, render, screen, fireEvent, waitFor, getByAltText} from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const apiURL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

const mock = new MockAdapter(axios, { onNoMatch: 'throwException' });

beforeAll(() => {
  mock.reset();
});

afterEach(cleanup);

const dragonsSample = [
  {createdAt: '2021-01-01T22:58:29.625Z', name: 'name1', type: 'type1', histories: 'histories1', id: '1'},
  {createdAt: '2021-01-02T22:58:30.625Z', name: 'name2', type: 'type2', histories: 'histories2', id: '2'},
  {createdAt: '2021-01-03T22:58:31.625Z', name: 'name3', type: 'type2', histories: 'histories3', id: '3'},
];

const singleDragon = {
  createdAt: '2021-01-01T22:58:29.625Z',
  name: 'name1',
  type: 'type1',
  histories: 'histories1',
  id: '1',
};

describe('Dashboard', () => {
  const renderWithRouterAndWait = () => 
    act(async () => {
      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );
    });

  it('load dragons when component mount', async () => {
    mock.onGet(apiURL).reply(200, dragonsSample);
    
    await renderWithRouterAndWait(<Dashboard />);

    expect(await screen.findByText('name1')).toBeInTheDocument();
    expect(await screen.findByText('name2')).toBeInTheDocument();
    expect(await screen.findByText('name3')).toBeInTheDocument();
  });

  it('display dragon item creation date formatted', async () => {
    mock.onGet(apiURL).reply(200, dragonsSample);

    await renderWithRouterAndWait(<Dashboard />);

    expect(await screen.findByText('1/1/2021')).toBeInTheDocument();
    expect(await screen.findByText('1/2/2021')).toBeInTheDocument();
    expect(await screen.findByText('1/3/2021')).toBeInTheDocument();
  });

  it('shows dragon details when we click on an item', async () => {
    mock.onGet(`${apiURL}/1`).reply(200, singleDragon);

    await renderWithRouterAndWait(<Dashboard />);

    const items = await screen.findAllByTestId('dragon-item');
    await act(async () => fireEvent.click(items[0]));

    expect(await screen.findByText('Dragon Details')).toBeInTheDocument();
  });

  it('should display dragon details with right data', async () => {
    mock.onGet(`${apiURL}/1`).reply(200, singleDragon);
    
    await renderWithRouterAndWait(<Dashboard />);
    
    const items = await screen.findAllByTestId('dragon-item');
    await act(async () => fireEvent.click(items[0]));

    const name = await screen.findAllByText('name1');
    const type = await screen.findAllByText('type1');
    const date = await screen.findAllByText('1/1/2021');
    
    expect(name[1]).toBeInTheDocument();
    expect(type[1]).toBeInTheDocument();
    expect(date[1]).toBeInTheDocument();
  });
});
