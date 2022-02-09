import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders title", () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const linkElement = screen.getByText(/tic tac toe/i);
  expect(linkElement).toBeInTheDocument();
});
