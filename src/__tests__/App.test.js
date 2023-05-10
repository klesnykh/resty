import App from '../App';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import {rest} from 'msw';
import {setupServer} from 'msw/node';

const server = setupServer(
  rest.get('*', (req, res, ctx) => {
    console.log('SOMETHING')
    return res(ctx.json({count: 0, results: []}))
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Testing the root App component',() => {
  xtest('Can intercept fetch request', async () => {
    let response = await fetch('/greeting');
    let json = await response.json();
    console.log(json);
  });
  test('Can display a new data from the Form', async () => {
    render(
      <App/>
    );

    let url2 = screen.getByTestId('url-input');
    // update url with input
    fireEvent.change(url2, { target: { value: '/greeting' } });
    console.log(url2.value);

    //click go
    await fireEvent.click(screen.getByText('GO!'));

    let results = screen.getByTestId('results-test');
    console.log(results.value);
    expect(results).toBeVisible();
  });
})