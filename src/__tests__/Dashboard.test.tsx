import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Dashboard from 'modules/Dashboard';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { makeStore } from 'store/index';
import ThemeProviderMock from '../mocks/ThemeProviderMock';
import { act } from 'react-dom/test-utils';
import axios from 'axios';

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
  afterEach(() => {});
  it('Invoices Filter should be rendered', async () => {
    render(
      <Provider store={makeStore()}>
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
      <Provider store={makeStore()}>
        <BrowserRouter>
          <ThemeProviderMock>
            <Dashboard />
          </ThemeProviderMock>
        </BrowserRouter>
      </Provider>
    );
    const textDashboard = screen.getByTestId('create-invoice-btn');
    fireEvent.click(textDashboard);
    await act(async () =>
      expect(screen.getByText('Create Invoice')).toBeInTheDocument()
    );
  });
});
