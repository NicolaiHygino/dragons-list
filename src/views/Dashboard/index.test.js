import Dashboard from '.';
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { api } from 'services/api';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(api, { onNoMatch: "throwException" });

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
  afterEach(() => {
    mock.reset();
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
    mock.onGet().reply(200, dragonsSample);
    await renderWithRouterAndWait(<Dashboard />);

    expect(await screen.findByText('name1')).toBeInTheDocument();
    expect(await screen.findByText('name2')).toBeInTheDocument();
    expect(await screen.findByText('name3')).toBeInTheDocument();
  });

  it('display dragon item creation date formatted', async () => {
    mock.onGet().reply(200, dragonsSample);
    await renderWithRouterAndWait(<Dashboard />);

    expect(await screen.findByText('1/1/2021')).toBeInTheDocument();
    expect(await screen.findByText('1/2/2021')).toBeInTheDocument();
    expect(await screen.findByText('1/3/2021')).toBeInTheDocument();
  });

  it('shows dragon details when we click on an item', async () => {
    mock.onGet().reply(200, dragonsSample);
    await renderWithRouterAndWait(<Dashboard />);

    const items = await screen.findAllByTestId('dragon-item');
    await act(async () => fireEvent.click(items[0]));

    expect(await screen.findByText('Dragon Details')).toBeInTheDocument();
  });

  it('should display dragon details with right data', async () => {
    mock.onGet('/1').reply(200, singleDragon);
    mock.onGet().reply(200, dragonsSample);
    await renderWithRouterAndWait(<Dashboard />);
    
    const items = await screen.findAllByTestId('dragon-item');
    await act(async () => fireEvent.click(items[0]));

    const name = await screen.findAllByText('name1');
    const type = await screen.findAllByText('type1');
    const histories = await screen.findByText('histories1');
    const date = await screen.findAllByText('1/1/2021');
    
    expect(name[1]).toBeInTheDocument();
    expect(type[1]).toBeInTheDocument();
    expect(histories).toBeInTheDocument();
    expect(date[1]).toBeInTheDocument();
  });

  it('renders a edit button for every one dragon item', async () => {
    mock.onGet().reply(200, dragonsSample);
    await renderWithRouterAndWait(<Dashboard />);

    const editButtons = await screen.findAllByLabelText('edit');

    expect(editButtons).toHaveLength(3);
  });

  it('displays edit page when user click in edit button', async () => {
    mock.onGet().reply(200, dragonsSample);
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
      mock.onGet().reply(200, dragonsSample);
      await renderWithRouterAndWait(<Dashboard />);
      await goToEditPage();
  
      expect(await screen.findByRole('form')).toBeInTheDocument();
    });

    it('renders the right fields', async () => {
      mock.onGet().reply(200, dragonsSample);
      await renderWithRouterAndWait(<Dashboard />);
      await goToEditPage();

      expect(await screen.findByLabelText('Name')).toBeInTheDocument();
      expect(await screen.findByLabelText('Histories')).toBeInTheDocument();
      expect(await screen.findByLabelText('Type')).toBeInTheDocument();
    });

    it('renders field values with dragon details', async () => {
      mock.onGet('/1').reply(200, singleDragon);
      mock.onGet().reply(200, dragonsSample);
      await renderWithRouterAndWait(<Dashboard />);
      await goToEditPage();

      const name = await screen.findByLabelText('Name');
      const type = await screen.findByLabelText('Type');
      const histories = await screen.findByLabelText('Histories');

      expect(name.value).toBe('name1');
      expect(type.value).toBe('type1');
      expect(histories.value).toBe('histories1');
    });

    it('calls the api with the new data on submit', async () => {
      mock.onPut('/1').reply(200, { name: 'newdragon1', type:'newtype1' });
      mock.onGet('/1').reply(200, singleDragon);
      mock.onGet().reply(200, dragonsSample);
      await renderWithRouterAndWait(<Dashboard />);
      await goToEditPage();

      const name = await screen.findByLabelText('Name');
      const type = await screen.findByLabelText('Type');
      const histories = await screen.findByLabelText('Histories');
      const submitBtn = await screen.findByText('Save');
      
      userEvent.clear(name);
      userEvent.type(name, 'newdragon1');
      userEvent.clear(type);
      userEvent.type(type, 'newtype1');
      userEvent.clear(histories);
      userEvent.type(histories, 'newhistories1');
      userEvent.click(submitBtn);

      await waitFor(() => {
        expect(JSON.parse(mock.history.put[0].data)).toMatchObject({
          name: 'newdragon1', 
          type:'newtype1',
          histories: 'newhistories1',
        });
      });
    });
  });
});
