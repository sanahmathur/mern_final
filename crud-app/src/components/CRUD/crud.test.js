// import Todo from './Crud'
import React from 'react'

import '@testing-library/jest-dom/extend-expect';
import {render,screen} from '@testing-library/react'
import { MemoryRouter, Route, Router } from 'react-router-dom';
import App from '../../App';

import { createMemoryHistory } from 'history';
import Crud from './Crud';



it("test input field",()=>{
    render(
        <MemoryRouter initialEntries={["/Crud"]}>
        <Crud />
      </MemoryRouter>
    )
    const inp = screen.getByPlaceholderText('✋ Write Studedhsnt First Name')
    console.log(inp)
    expect(inp).toBeInTheDocument()
})



describe('ButtonLogin', () => {
    test('should pass', () => {
    //   const history = createMemoryHistory({ initialEntries: ['/'] });
      const { getByText } = render(
        <MemoryRouter initialEntries={["/Crud"]}>
        <Crud />
      </MemoryRouter>
      );
    //   fireEvent.click(getByText('Iniciar sesión'));
    //   expect(history.location.pathname).toBe('/login');
    });
  });