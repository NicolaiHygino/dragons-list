import Dashboard from '.';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { api } from 'services/api';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(api, { onNoMatch: "throwException" });

beforeAll(() => {
  mock.reset();
});

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
  beforeEach(() => {
    mock.onGet('/1').reply(200, singleDragon);
    mock.onGet().reply(200, dragonsSample);
  });
  
  afterEach(() => {
    mock.resetHandlers();
  });
  
  const renderWithRouterAndWait = () => 
    act(async () => {
      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );
    });

  it('load dragons when component mount', async () => {    
    await renderWithRouterAndWait(<Dashboard />);

    expect(await screen.findByText('name1')).toBeInTheDocument();
    expect(await screen.findByText('name2')).toBeInTheDocument();
    expect(await screen.findByText('name3')).toBeInTheDocument();
  });

  it('display dragon item creation date formatted', async () => {
    await renderWithRouterAndWait(<Dashboard />);

    expect(await screen.findByText('1/1/2021')).toBeInTheDocument();
    expect(await screen.findByText('1/2/2021')).toBeInTheDocument();
    expect(await screen.findByText('1/3/2021')).toBeInTheDocument();
  });

  it('shows dragon details when we click on an item', async () => {
    await renderWithRouterAndWait(<Dashboard />);

    const items = await screen.findAllByTestId('dragon-item');
    await act(async () => fireEvent.click(items[0]));

    expect(await screen.findByText('Dragon Details')).toBeInTheDocument();
  });

  it('should display dragon details with right data', async () => {
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

  it('renders a edit button for every one dragon item', async () => {
    await renderWithRouterAndWait(<Dashboard />);

    const editButtons = await screen.findAllByLabelText('edit');

    expect(editButtons).toHaveLength(3);
  });

  it('displays edit page when user click in edit button', async () => {
    await renderWithRouterAndWait(<Dashboard />);

    const editButtons = await screen.findAllByLabelText('edit');
    await act(async () => fireEvent.click(editButtons[0]));

    expect(await screen.findByText('Edit Dragon')).toBeInTheDocument();
  });

  describe('Edit page', () => {
    const goToEditPage = async () => {
      const editButtons = await screen.findAllByLabelText('edit');
      await act(async () => fireEvent.click(editButtons[0]));
    };
    
    it('has a form', async () => {
      await renderWithRouterAndWait(<Dashboard />);
      await goToEditPage();
  
      expect(await screen.findByRole('form')).toBeInTheDocument();
    });

    it('renders the right fields', async () => {
      await renderWithRouterAndWait(<Dashboard />);
      await goToEditPage();

      expect(await screen.findByLabelText('Name')).toBeInTheDocument();
      expect(await screen.findByLabelText('Type')).toBeInTheDocument();
    });

    it('renders field values with dragon details', async () => {
      await renderWithRouterAndWait(<Dashboard />);
      await goToEditPage();

      const name = await screen.findByLabelText('Name');
      const type = await screen.findByLabelText('Type');

      expect(name.value).toBe('name1');
      expect(type.value).toBe('type1');
    });
  });
});
