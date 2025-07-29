"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChallengeData } from "@/types/challenge";
import { createChallenge } from "@/utils/challengeFunctions";
import React from "react";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Challenge title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  startDate: z.string().min(1, {
    message: "Start date is required.",
  }),
  endDate: z.string().min(1, {
    message: "End date is required.",
  }),
  maxParticipants: z
    .number()
    .min(2, {
      message: "Maximum participants must be at least 2.",
    })
    .max(10, {
      message: "Maximum participants cannot exceed 10.",
    }),
});

const CreateChallengeForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      maxParticipants: 0,
    },
  });

  const onSubmit = (data: ChallengeData) => {
    console.log("Creating challenge...");
    setIsLoading(true);
    createChallenge(data)
      .then((response) => {
        if (response.ok) {
          alert("Challenge created successfully!");
          alert("Challenge Details: " + JSON.stringify(data, null, 2));
          form.reset();
        } else {
          alert("Failed to create challenge. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error creating challenge:", error);
        alert("An error occurred while creating the challenge.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-500"></div>
        </div>
      )}
      {!isLoading && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    Challenge Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-800 dark:text-white"
                      placeholder="e.g. 30-Day Plank Challenge"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-800 dark:text-white"
                      placeholder="Describe the challenge goals, rules, etc."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">
                      Start Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-800 dark:text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">
                      End Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-800 dark:text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxParticipants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">
                      Max Participants
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={2}
                        max={10}
                        className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-800 dark:text-white"
                        placeholder="e.g. 10"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-lg py-2 rounded-xl shadow-md transition duration-200"
            >
              🚀 Launch Challenge
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default CreateChallengeForm;
