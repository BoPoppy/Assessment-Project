import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Dashboard from 'modules/Dashboard';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { makeStoreTest } from 'store/index';
import ThemeProviderMock from '../mocks/ThemeProviderMock';
import { act } from 'react-dom/test-utils';

jest.mock('axios', () => {
  const mAxiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
    interceptors: {
      request: { use: jest.fn(() => {}) },
      response: { use: jest.fn(() => {}) },
    },
    defaults: {
      headers: {
        common: {
          Authorization: '',
        },
        'Content-Type': '',
        'Time-zone': '',
      },
    },
  };
  return {
    create: jest.fn(() => mAxiosInstance),
  };
});

describe('<Dashboard />', () => {
  it('Invoices Filter should be rendered', async () => {
    render(
      <Provider store={makeStoreTest()}>
        <BrowserRouter>
          <ThemeProviderMock>
            <Dashboard />
          </ThemeProviderMock>
        </BrowserRouter>
      </Provider>
    );
    const textDashboard = screen.getByText('Invoices Filter');
    await act(async () => expect(textDashboard).toBeInTheDocument());
  });

  it('When click on the create invoice button, a popup should appear', async () => {
    render(
      <Provider store={makeStoreTest()}>
        <BrowserRouter>
          <ThemeProviderMock>
            <Dashboard />
          </ThemeProviderMock>
        </BrowserRouter>
      </Provider>
    );
    const textDashboard =
      screen.getByTestId<HTMLButtonElement>('create-invoice-btn');
    fireEvent.click(textDashboard);
    await act(async () =>
      expect(screen.getByText('Create Invoice')).toBeInTheDocument()
    );
  });

  it('The validation for filter date should appear error message if invalid', async () => {
    render(
      <Provider store={makeStoreTest()}>
        <BrowserRouter>
          <ThemeProviderMock>
            <Dashboard />
          </ThemeProviderMock>
        </BrowserRouter>
      </Provider>
    );
    const startInput = screen.getByTestId<HTMLInputElement>(
      'start-date-filter-menu'
    );
    const endInput = screen.getByTestId<HTMLInputElement>(
      'end-date-filter-menu'
    );
    const submitBtn = screen.getByTestId<HTMLButtonElement>('btn-submit-date');
    fireEvent.change(startInput, { target: { value: '04/14/2023' } });
    fireEvent.change(endInput, { target: { value: '04/13/2023' } });
    fireEvent.click(submitBtn);
    await act(async () =>
      expect(
        screen.getByText('Please select a valid from date and to date.')
      ).toBeInTheDocument()
    );
  });

  it('The clear date button should work correctly', async () => {
    render(
      <Provider store={makeStoreTest()}>
        <BrowserRouter>
          <ThemeProviderMock>
            <Dashboard />
          </ThemeProviderMock>
        </BrowserRouter>
      </Provider>
    );
    const startInput = screen.getByTestId<HTMLInputElement>(
      'start-date-filter-menu'
    );
    const endInput = screen.getByTestId<HTMLInputElement>(
      'end-date-filter-menu'
    );
    const submitBtn = screen.getByTestId<HTMLButtonElement>('btn-submit-date');
    const clearBtn = screen.getByTestId<HTMLButtonElement>('btn-clear-date');
    fireEvent.change(startInput, { target: { value: '04/14/2023' } });
    fireEvent.change(endInput, { target: { value: '04/13/2023' } });
    fireEvent.click(submitBtn);
    fireEvent.click(clearBtn);
    await act(async () => {
      expect(startInput).toHaveValue('');
      expect(endInput).toHaveValue('');
    });
  });

  it('The Validation for create invoice should work correctly', async () => {
    render(
      <Provider store={makeStoreTest()}>
        <BrowserRouter>
          <ThemeProviderMock>
            <Dashboard />
          </ThemeProviderMock>
        </BrowserRouter>
      </Provider>
    );
    const createInvoiceBtn =
      screen.getByTestId<HTMLButtonElement>('create-invoice-btn');
    fireEvent.click(createInvoiceBtn);
    const startInput =
      screen.getByTestId<HTMLInputElement>('start-date-create');
    const endInput = screen.getByTestId<HTMLInputElement>('end-date-create');
    fireEvent.change(startInput, { target: { value: '04/14/2023' } });
    fireEvent.change(endInput, { target: { value: '04/13/2023' } });
    const submitInvoiceBtn =
      screen.getByTestId<HTMLButtonElement>('submit-invoice-btn');
    fireEvent.click(submitInvoiceBtn);
    await screen.findByText(/Please select a valid due date/i);
  });
});
