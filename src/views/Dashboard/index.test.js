import Dashboard from '.';
import { DragonsProvider } from 'context/Dragons';
import { ProvideAuth } from 'context/Auth';
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { api } from 'services/api';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(api, { onNoMatch: "throwException" });

const dragonsSample = [
  {createdAt: '2021-01-02T22:58:30.625Z', name: 'name2', type: 'type2', histories: 'histories2', id: '2'},
  {createdAt: '2021-01-01T22:58:29.625Z', name: 'name1', type: 'type1', histories: 'histories1', id: '1'},
  {createdAt: '2021-01-03T22:58:31.625Z', name: 'name3', type: 'type3', histories: 'histories3', id: '3'},
  {createdAt: '2021-01-04T22:58:32.625Z', name: 'name4', type: 'type4', histories: 'histories4', id: '4'},
  {createdAt: '2021-01-05T22:58:33.625Z', name: 'name5', type: 'type5', histories: 'histories5', id: '5'},
  {createdAt: '2021-01-06T22:58:34.625Z', name: 'name6', type: 'type6', histories: 'histories6', id: '6'},
  {createdAt: '2021-01-07T22:58:35.625Z', name: 'name7', type: 'type7', histories: 'histories7', id: '7'},
];

const singleDragon = {
  createdAt: '2021-01-01T22:58:29.625Z',
  name: 'name1',
  type: 'type1',
  histories: 'histories1',
  id: '1',
};

const newDragon = {
  createdAt: '2021-01-01T22:58:29.625Z',
  name: 'anewname999',
  type: 'anewtype999',
  histories: 'anewhistories999',
  id: '999',
};

const editDragon = { 
  name: 'anewname999', 
  type:'anewtype999', 
  histories: 'ahistories999'
}

describe('Dashboard', () => {
  beforeEach(() => {
    mock.onDelete('/1').reply(200, singleDragon);
    mock.onPut('/1').reply(200, editDragon);
    mock.onPost().reply(200, newDragon);
    mock.onGet('/300').reply(404);
    mock.onGet('/1').reply(200, singleDragon);
    mock.onGet().reply(200, dragonsSample);
  });
  
  afterEach(() => {
    mock.reset();
  });

  const renderWithRouterAndWait = (component, initialPage = '/dashboard') => 
    act(async () => {
      render(
        <MemoryRouter initialEntries={[initialPage]}>
          <DragonsProvider>
            <ProvideAuth>
              { component }
            </ProvideAuth>
          </DragonsProvider>
        </MemoryRouter>
      );
    });

  it('load dragons when component mount', async () => {    
    await renderWithRouterAndWait(<Dashboard />);

    expect(await screen.findByText('name1')).toBeInTheDocument();
    expect(await screen.findByText('name2')).toBeInTheDocument();
    expect(await screen.findByText('name3')).toBeInTheDocument();
  });

  it('display dragons names alphabetically', async () => {
    await renderWithRouterAndWait(<Dashboard />);

    const namesList = await screen.findAllByTestId('dragon-item-name');

    expect(namesList[0].textContent).toContain('name1');
    expect(namesList[1].textContent).toContain('name2');
    expect(namesList[2].textContent).toContain('name3');
  });

  it('shows dragon details when we click on an item', async () => {
    await renderWithRouterAndWait(<Dashboard />);

    const items = await screen.findAllByTestId('dragon-item');
    await act(async () => fireEvent.click(items[0]));

    expect(await screen.findByText('Dragon Details')).toBeInTheDocument();
  });

  it('renders a pagination buttons', async () => {
    await renderWithRouterAndWait(<Dashboard />);

    const pagButton = await screen.findAllByTestId('pag-button');

    expect(pagButton.length).toBe(2);
  });

  it('show new items when paginate', async () => {
    await renderWithRouterAndWait(<Dashboard />);

    const pagButton = await screen.findAllByTestId('pag-button');
    act(() => userEvent.click(pagButton[1]));

    expect(await screen.findByText('name7')).toBeInTheDocument();
  });

  it('renders a edit button for every one dragon item', async () => {
    await renderWithRouterAndWait(<Dashboard />);

    const editButtons = await screen.findAllByLabelText('edit');

    expect(editButtons).toHaveLength(5);
  });

  it('renders a delete button for every one dragon item', async () => {
    await renderWithRouterAndWait(<Dashboard />);

    const delButtons = await screen.findAllByLabelText('delete');

    expect(delButtons).toHaveLength(5);
  });

  it('deletes the respective dragon when we click the delete button', async () => {
    await renderWithRouterAndWait(<Dashboard />);

    const delButtons = await screen.findAllByLabelText('delete');
    act(() => userEvent.click(delButtons[0]));
    
    expect(mock.history.delete.length).toBe(1);
    await waitFor(() => {
      expect(screen.queryByText('name1')).not.toBeInTheDocument();
    });
  });

  it('renders a add new dragon button', async () => {
    await renderWithRouterAndWait(<Dashboard />);

    const addButton = await screen.findByText('Add New Dragon');

    expect(addButton).toBeInTheDocument();
  });

  it('displays edit page when user click in edit button', async () => {
    await renderWithRouterAndWait(<Dashboard />);

    const editButtons = await screen.findAllByLabelText('edit');
    await act(async () => fireEvent.click(editButtons[0]));

    expect(await screen.findByText('Edit Dragon')).toBeInTheDocument();
  });

  it('displays add new page when user click in add new button', async () => {
    await renderWithRouterAndWait(<Dashboard />);

    const addButton = await screen.findByText('Add New Dragon');
    await act(async () => fireEvent.click(addButton));

    expect(await screen.findByText('New Dragon')).toBeInTheDocument();
  });

  describe('Details page', () => {
    it('displays right dragon details', async () => {
      await renderWithRouterAndWait(<Dashboard />);
      
      const items = await screen.findAllByTestId('dragon-item');
      await act(async () => fireEvent.click(items[0]));
  
      const name = await screen.findAllByText('name1');
      const type = await screen.findAllByText('type1');
      const histories = await screen.findByText('histories1');
      const date = await screen.findByText('1/1/2021');
      
      expect(name[1]).toBeInTheDocument();
      expect(type[1]).toBeInTheDocument();
      expect(histories).toBeInTheDocument();
      expect(date).toBeInTheDocument();
    });

    it.skip("shows a error message if the dragon doesn't exists", async () => {
      await renderWithRouterAndWait(<Dashboard />, '/dashboard/details/300');

      expect(await screen.findByText("Dragon doesn't exists")).toBeInTheDocument();
    });
  });

  describe('Add New Page', () => {
    const goToAddNewPage = async () => {
      const addButton = screen.getByText('Add New Dragon');
      await act(async () => userEvent.click(addButton));
    };

    const change = (field, text) => {
      userEvent.clear(field);
      userEvent.type(field, text);
    };

    it('has a form', async () => {
      await renderWithRouterAndWait(<Dashboard />);
      await goToAddNewPage();
  
      expect(await screen.findByRole('form')).toBeInTheDocument();
    });

    it('renders the right fields', async () => {
      await renderWithRouterAndWait(<Dashboard />);
      await goToAddNewPage();

      expect(await screen.findByLabelText('Name')).toBeInTheDocument();
      expect(await screen.findByLabelText('Histories')).toBeInTheDocument();
      expect(await screen.findByLabelText('Type')).toBeInTheDocument();
    });

    it('calls the api with the new data on submit', async () => {
      await renderWithRouterAndWait(<Dashboard />);
      await goToAddNewPage();

      change(await screen.findByLabelText('Name'), 'anewname999');
      change(await screen.findByLabelText('Type'), 'anewtype999');
      change(await screen.findByLabelText('Histories'), 'anewhistories999');
      userEvent.click(await screen.findByText('Save'));

      await waitFor(() => {
        expect(JSON.parse(mock.history.post[0].data)).toMatchObject({
          name: 'anewname999', 
          type:'anewtype999',
          histories: 'anewhistories999',
        });
      });
    });

    it("shows new dragon's name on successfully submitted", async () => {
      await renderWithRouterAndWait(<Dashboard />);
      await goToAddNewPage();

      change(await screen.findByLabelText('Name'), 'anewname999');
      change(await screen.findByLabelText('Type'), 'anewtype999');
      change(await screen.findByLabelText('Histories'), 'anewhistories999');
      
      await act(async () => {
        userEvent.click(await screen.findByText('Save'));
      });

      expect(await screen.findByText('anewname999')).toBeInTheDocument();
    });

    it('shows required message if submitted empty', async () => {
      await renderWithRouterAndWait(<Dashboard />);
      await goToAddNewPage();

      await act(async () => {
        userEvent.click(await screen.findByText('Save'));
      });

      const requiredMessages = await screen.findAllByText('Required');

      expect(requiredMessages.length).toBe(3);
    });
  });

  describe('Edit page', () => {
    const goToEditPage = async () => {
      const editButtons = await screen.findAllByLabelText('edit');
      await act(async () => fireEvent.click(editButtons[0]));
    };

    const change = (field, text) => {
      userEvent.clear(field);
      userEvent.type(field, text);
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
      expect(await screen.findByLabelText('Histories')).toBeInTheDocument();
      expect(await screen.findByLabelText('Type')).toBeInTheDocument();
    });

    it('renders field values with dragon details', async () => {
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
      await renderWithRouterAndWait(<Dashboard />);
      await goToEditPage();

      change(await screen.findByLabelText('Name'), 'anewname999');
      change(await screen.findByLabelText('Type'), 'anewtype999');
      change(await screen.findByLabelText('Histories'), 'anewhistories999');
      userEvent.click(await screen.findByText('Save'));

      await waitFor(() => {
        expect(JSON.parse(mock.history.put[0].data)).toMatchObject({
          name: 'anewname999', 
          type:'anewtype999',
          histories: 'anewhistories999',
        });
      });
    });

    it("shows new dragon's name on successfully submitted", async () => {
      await renderWithRouterAndWait(<Dashboard />);
      await goToEditPage();

      change(await screen.findByLabelText('Name'), 'anewname999');
      change(await screen.findByLabelText('Type'), 'anewtype999');
      change(await screen.findByLabelText('Histories'), 'anewhistories999');
      
      await act(async () => {
        userEvent.click(await screen.findByText('Save'));
      });

      expect(await screen.findByText('anewname999')).toBeInTheDocument();
    });

    it.skip("shows a error message if the dragon doesn't exists", async () => {
      await renderWithRouterAndWait(<Dashboard />, '/dashboard/edit/1');

      expect(await screen.findByText("Dragon doesn't exists")).toBeInTheDocument();
    });
  });
});
