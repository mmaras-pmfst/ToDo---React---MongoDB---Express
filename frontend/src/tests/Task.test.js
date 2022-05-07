import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Task from '../components/Task';

test('rendering task title ', () => {
  const newTask = {
    title: 'Test',
    description: 'Testing method',
    datetime: new Date().toLocaleString().replace(',', '').replace(/:.. /, ' '),
    complete: false,
    timetable: '20/02/2021 12:58 PM',
  };
  const component = render(<Task task={newTask} />);

  expect(component.container).toHaveTextContent('Test');
});

test('on click eventHandler ', () => {
  const newTask = {
    title: 'Test',
    description: 'Testing method',
    datetime: new Date().toLocaleString().replace(',', '').replace(/:.. /, ' '),
    complete: false,
    timetable: '20/02/2021 12:58 PM',
  };

  const testHandler = jest.fn();

  const component = render(<Task task={newTask} completeTaks={testHandler} />);

  const button = component.container.querySelector('.complete');
  fireEvent.click(button);
  expect(testHandler.mock.calls).toHaveLength(1);
});
