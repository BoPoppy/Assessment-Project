import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from 'modules/Login';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { makeStore } from 'store/index';
import ThemeProviderMock from '../mocks/ThemeProviderMock';

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

describe('<Login />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Login Title should be rendered', async () => {
    render(
      <Provider store={makeStore()}>
        <BrowserRouter>
          <ThemeProviderMock>
            <Login />
          </ThemeProviderMock>
        </BrowserRouter>
      </Provider>
    );
    const adminTitle = screen.getByText('Login to SimpleInvoice');
    expect(adminTitle).toBeInTheDocument();
  });
  it('If input nothing and submit, a error message appears', async () => {
    render(
      <Provider store={makeStore()}>
        <BrowserRouter>
          <ThemeProviderMock>
            <Login />
          </ThemeProviderMock>
        </BrowserRouter>
      </Provider>
    );
    const emailInput = screen.getByPlaceholderText('Username');
    const passwordInput =
      screen.getByPlaceholderText<HTMLInputElement>('Password');
    const buttonEl = screen.getByTestId<HTMLButtonElement>('btn-submit');

    const testValue = '';
    fireEvent.change(emailInput, { target: { value: testValue } });
    fireEvent.change(passwordInput, { target: { value: testValue } });
    fireEvent.click(buttonEl);
    await waitFor(async () => {
      expect(screen.getAllByText('This field is required!')).toHaveLength(2);
    });
  });
  it('After input a wrong email format, a error message appears', async () => {
    render(
      <Provider store={makeStore()}>
        <BrowserRouter>
          <ThemeProviderMock>
            <Login />
          </ThemeProviderMock>
        </BrowserRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Username');
    const passwordInput =
      screen.getByPlaceholderText<HTMLInputElement>('Password');
    const buttonEl = screen.getByTestId<HTMLButtonElement>('btn-password');

    const testValue = '';
    fireEvent.change(emailInput, { target: { value: testValue } });
    fireEvent.change(passwordInput, { target: { value: 'hihihi' } });
    fireEvent.click(buttonEl);
    await waitFor(async () => {
      expect(passwordInput).toHaveAttribute('type', 'text');
    });
  });
});
