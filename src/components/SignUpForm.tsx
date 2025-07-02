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

  const createUser = async (email: string, password: string) => {
    console.log("Create User Function called", email, password);

    const response = await fetch("/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Log the response for debugging
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating user:", errorData);
      throw new Error(errorData.error || "Failed to create user");
    }
    return response.json();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //if user already exists, return error
    createUser(email, password)
      .then((data) => {
        console.log("User created successfully:", data);
        // Store user data in local storage or session
        localStorage.setItem("user", JSON.stringify(data.user));
        // Redirect to login page
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
    setEmail("");
    setPassword("");
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
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

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

            <Button
              type="submit"
              className="w-full"
            >
              Sign Up
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
