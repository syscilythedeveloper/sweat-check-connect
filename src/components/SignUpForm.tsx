//[x]need to handle: when user already exists, return error
//[x]need to handle: when user is created, return success message
//[x]need to handle: when user is created, redirect to login page
//[x]need to handle: when user is created, store user data in local storage or session
//[x]need to handle: when user is created, show success message
//[]need to handle: after email and password are set, show another form to set first name, last name, email address and profile photo

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  validatePassword,
  validateNewUser,
  saveUser,
} from "./utils/userValidation";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async (email: string, password: string) => {
    setSignUpError("");
    setSignUpSuccess("");
    setPasswordErrors([]);
    const userExists = await validateNewUser(email);

    if (userExists) {
      setSignUpError("User already exists. Please log in.");
      return;
    }

    const errors = validatePassword(password);
    setPasswordErrors(errors);
    if (errors.length > 0) {
      return;
    }
    try {
      await saveUser(email, password);
      setSignUpSuccess("Successful Sign Up!");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error in createUser:", error);
      setSignUpError("Failed to create user. Please try again.");
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await createUser(email, password);
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
