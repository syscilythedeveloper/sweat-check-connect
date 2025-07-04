import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SignUpForm from "../SignUpForm";
import * as utils from "../utils/userValidation";

// Mock the utility functions
jest.mock("../utils/userValidation");

describe("SignUpForm UI", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders email and password fields and sign up button", () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it("shows password errors when validation fails", async () => {
    // Mock validatePassword to return an error
    (utils.validatePassword as jest.Mock).mockReturnValue([
      "Password must be at least 8 characters long.",
    ]);
    (utils.validateNewUser as jest.Mock).mockResolvedValue(false);

    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "abc" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(
      await screen.findByText(/at least 8 characters/i)
    ).toBeInTheDocument();
    expect(utils.saveUser).not.toHaveBeenCalled();
  });

  it("shows existing user error if user already exists", async () => {
    (utils.validateNewUser as jest.Mock).mockReturnValue(true);
    (utils.validatePassword as jest.Mock).mockReturnValue([]); // No password errors

    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "exists@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "ValidPass1!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(await screen.findByText(/user already exists/i)).toBeInTheDocument();

    expect(utils.saveUser).not.toHaveBeenCalled();
  });
  it("calls save user if email and password are valid", async () => {
    (utils.validateNewUser as jest.Mock).mockReturnValue(false);
    (utils.validatePassword as jest.Mock).mockReturnValue([]); // No password errors

    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "exists@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "ValidPass1!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(await screen.findByText(/Successful Sign Up/i)).toBeInTheDocument();

    expect(utils.saveUser).toHaveBeenCalledTimes(1);
  });
});
