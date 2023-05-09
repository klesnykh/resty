import App from '../App';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Testing the root App component', () => {
  test('Can display a new data from the Form', () => {
    render(
      <App/>
    );

    let url = screen.getByTestId('url-input');
    // update url with input
    fireEvent.change(url, { target: { value: 'test url' } });

    let method = screen.getByTestId('method-input');
    // update the method with input
    fireEvent.change(method, { target: { value: 'PUT' } });

    let textBox = screen.getByTestId('text-input');
    fireEvent.change(textBox, { target: { value: 'test text' } });

    //click go
    fireEvent.click(screen.getByText('GO!'));

    let results = screen.getByTestId('results-test');
    expect(results).toBeVisible();
    expect(results).toHaveTextContent(/test text/gm);
  });
})