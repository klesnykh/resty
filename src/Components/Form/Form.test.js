import Form from '.';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Testing the Form component', () => {
  test('Can show the form', () => {
    let callApi = jest.fn();
    render(
      <Form handleApiCall={callApi}/>
    );

    let url = screen.getByTestId('url-input');
    expect(url).toBeVisible();

    // update url with input
    fireEvent.change(url, { target: { value: 'test url' } });
    let method = screen.getByTestId('method-input');
    expect(method).toBeVisible();

    // update the method with input
    fireEvent.change(method, { target: { value: 'PUT' } });
    let textBox = screen.getByTestId('text-input');
    expect(textBox).toBeVisible();
    fireEvent.change(textBox, { target: { value: 'test text' } });
    fireEvent.click(screen.getByText('GO!'));
    expect(callApi).toHaveBeenCalled();
    //expect(screen.getByText('test url')).toBeVisible();
    //expect(screen.getByText('test text')).toBeVisible();
  });
})