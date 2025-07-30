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
import { Calendar } from "@/components/ui/calendar";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChallengeData } from "@/types/challenge";
import { createChallenge } from "@/utils/challengeFunctions";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { ChevronDownIcon } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Challenge title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  startDate: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Please enter date in MM/DD/YYYY format")
    .refine((date) => {
      const [month, day, year] = date.split("/").map(Number);
      const dateObj = new Date(year, month - 1, day);
      return dateObj.getMonth() === month - 1 && dateObj.getDate() === day;
    }, "Please enter a valid date"),
  duration: z

    .number()
    .min(1, {
      message: "Duration must be at least 1 day.",
    })
    .max(31, {
      message: "Duration cannot exceed 31 days.",
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

const calculateEndDate = (startDate: string, duration: number): string => {
  if (!startDate || !duration) return "";

  const [month, day, year] = startDate.split("/").map(Number);
  const start = new Date(year, month - 1, day);
  const end = new Date(start);
  end.setDate(start.getDate() + duration - 1); // -1 because we include the start day

  return `${(end.getMonth() + 1).toString().padStart(2, "0")}/${end
    .getDate()
    .toString()
    .padStart(2, "0")}/${end.getFullYear()}`;
};

type FormData = z.infer<typeof formSchema>;
const CreateChallengeForm = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      duration: 7,
      maxParticipants: 0,
    },
  });

  const onSubmit = (formData: FormData) => {
    if (!user?.id) {
      alert("You must be signed in to create a challenge.");
      return;
    }

    console.log("Creating challenge...");
    setIsLoading(true);

    const endDate = calculateEndDate(formData.startDate, formData.duration);

    const challengeData: ChallengeData = {
      ...formData,
      endDate, // calculated here
      creatorId: user.id,
    };

    createChallenge(challengeData)
      .then((response) => {
        if (response.ok) {
          const result = response.json();

          console.log("Challenge created:", result);
          toast.success(
            `Challenge "${challengeData.title}" created successfully!`
          );

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
    <div className="w-full ">
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
                      className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-800 dark:text-white rounded-2xl p-6 focus:shadow-[0_0_10px_2px_rgba(168,85,247,0.4)]"
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
                      className="resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-800 dark:text-white rounded-2xl p-6 focus:shadow-[0_0_10px_2px_rgba(168,85,247,0.4)]"
                      placeholder="Describe the challenge goals, rules, etc."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => {
                  const valueAsDate =
                    field.value && /^\d{2}\/\d{2}\/\d{4}$/.test(field.value)
                      ? new Date(
                          Number(field.value.split("/")[2]),
                          Number(field.value.split("/")[0]) - 1,
                          Number(field.value.split("/")[1])
                        )
                      : undefined;

                  return (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-200">
                        Start Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between font-normal"
                            type="button"
                          >
                            {field.value ? field.value : "Select date"}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={valueAsDate}
                            captionLayout="dropdown"
                            fromYear={new Date().getFullYear()}
                            toYear={new Date().getFullYear() + 1}
                            onSelect={(date) => {
                              if (date) {
                                // Format as MM/DD/YYYY
                                const mm = String(date.getMonth() + 1).padStart(
                                  2,
                                  "0"
                                );
                                const dd = String(date.getDate()).padStart(
                                  2,
                                  "0"
                                );
                                const yyyy = date.getFullYear();
                                field.onChange(`${mm}/${dd}/${yyyy}`);
                              }
                            }}
                            disabled={(date) => {
                              const today = new Date();
                              const max = new Date();
                              max.setDate(today.getDate() + 365);
                              return date < today || date > max;
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  );
                }}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-200">
                        Duration (days)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={31}
                          className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-800 dark:text-white rounded-2xl p-6 focus:shadow-[0_0_10px_2px_rgba(168,85,247,0.4)]"
                          placeholder="e.g. 7"
                          {...field}
                          onChange={(e) => {
                            const val = e.target.value.replace(/^0+/, "");
                            field.onChange(val === "" ? "" : Number(val));
                          }}
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
                          className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-800 dark:text-white rounded-2xl p-6 focus:shadow-[0_0_10px_2px_rgba(168,85,247,0.4)]"
                          placeholder="e.g. 10"
                          {...field}
                          onChange={(e) => {
                            const val = e.target.value.replace(/^0+/, "");
                            field.onChange(val === "" ? "" : Number(val));
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              {Number(form.watch("duration")) > 31 && (
                <div className="text-red-500 text-sm mt-1">
                  Duration cannot exceed 31 days.
                </div>
              )}
              {Number(form.watch("maxParticipants")) > 10 && (
                <div className="text-red-500 text-sm mt-1">
                  Max participants cannot exceed 10.
                </div>
              )}
            </div>
            {form.watch("startDate") && form.watch("duration") && (
              <div className="bg-blue-50 dark:bg-slate-900 border border-blue-200 dark:border-slate-600 rounded-lg p-3">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Challenge will end on:</strong>{" "}
                  {calculateEndDate(
                    form.watch("startDate"),
                    form.watch("duration")
                  )}
                </p>
              </div>
            )}

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
