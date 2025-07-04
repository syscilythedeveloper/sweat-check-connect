//[]need to handle: when user already exists, return error
//[]need to handle: when user is created, return success message
//[]need to handle: when user is created, redirect to login page
//[]need to handle: when user is created, store user data in local storage or session
//[]need to handle: when user is created, show success message
//[]need to handle: after email and password are set, show another form to set first name, last name, email address and profile photo

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const validateNewUser = async (email: string) => {
    console.log("Checking for user", email);
    const response = await fetch(
      `/api/users?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json(); // ✅ Parse the JSON
      console.log("Response from getUser:", data.exists);
      return data.exists; // ✅ Return the actual data
    } else {
      throw new Error("Failed to check user existence");
    }
  };

  const validatePassword = (password: string) => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number.");
    }
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }

    setPasswordErrors(errors);
    return errors.length === 0;
  };

  const createUser = async (email: string, password: string) => {
    setSignUpError("");
    setSignUpSuccess("");
    setPasswordErrors([]);
    const userExists = await validateNewUser(email);
    const isValidPassword = validatePassword(password);

    if (userExists) {
      setSignUpError("User already exists. Please log in.");
      return;
    }

    if (!isValidPassword) {
      return;
    } else setPasswordErrors([]);
    console.log("Create User Function called", email, password);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      setSignUpSuccess("Successful Sign Up!");
      setEmail("");
      setPassword("");

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating user:", errorData);
        throw new Error(errorData.error || "Failed to create user");
      }

      return response.json();
    } catch (error) {
      console.error("Error in createUser:", error);
      setSignUpError("Failed to create user. Please try again.");
      return;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    createUser(email, password);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Sign up for your Sweat Check Connect account
          </p>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSignUpError("");
                  setSignUpSuccess("");
                }}
                required
              />
            </div>
            {signUpError && (
              <p className="text-red-500 text-sm">{signUpError}</p>
            )}
            {signUpSuccess && (
              <p className="text-green-500 text-sm">{signUpSuccess}</p>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {passwordErrors.length > 0 && (
              <ul className="text-red-500 text-sm list-disc ml-5">
                {passwordErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Already have an Account?{" "}
              </span>
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
