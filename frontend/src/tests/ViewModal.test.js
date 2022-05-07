import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen, getByText } from '@testing-library/react';
import EditModal from '../components/EditModal';

describe('Component <EditModal />', () => {
  let component;

  beforeEach(() => {
    component = render(
      <EditModal modalIsOpen={true} title="Test modal is visible">
        <div className="testDiv" />
      </EditModal>
    );
  });

  test('child rendering', () => {
    screen.debug();

    expect(component.container.querySelector('testDiv')).toBeDefined();
  });

  test('child element is visible', () => {
    component.debug();
    expect(document.querySelector('.bg-modal')).toBeInTheDocument();
  });
});
