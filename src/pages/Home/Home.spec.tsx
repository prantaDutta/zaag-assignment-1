import React from 'react'
import {render, screen} from "@testing-library/react";
import {Home} from "./index";

it('should render "Hello world" in Home', () => {
    render(<Home />)
    expect(screen.getByText(/Hello World/)).toBeInTheDocument()
});