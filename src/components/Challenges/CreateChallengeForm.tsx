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
import { X } from "lucide-react";

const formSchema = z
  .object({
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
      .min(1, {
        message: "Challenge must have at least 1 participant",
      })
      .max(20, {
        message: "Maximum participants cannot exceed 20.",
      }),
    tags: z
      .array(
        z.enum(["cardio", "weight", "glute", "strength", "yoga", "running"])
      )
      .optional(),
    frequencyType: z.enum(["DAILY", "WEEKLY"]),
    checkInsPerWeek: z
      .number()
      .max(7, { message: "Cannot exceed more than 7 check ins per week" })
      .optional(),
  })
  .refine(
    (data) => {
      // Only require checkInsPerWeek if frequencyType is "WEEKLY"
      if (data.frequencyType === "WEEKLY") {
        return (
          data.checkInsPerWeek !== undefined &&
          data.checkInsPerWeek >= 1 &&
          data.checkInsPerWeek <= 7
        );
      }
      return true; // No validation needed for DAILY
    },
    {
      message:
        "Must specify 1-7 check-ins per week when using custom frequency.",
      path: ["checkInsPerWeek"], // Shows error on the correct field
    }
  );

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
const MAX_TAGS = 5;

type CreateChallengeFormProps = {
  setShowCreateForm?: (show: boolean) => void;
};

const CreateChallengeForm = ({
  setShowCreateForm,
}: CreateChallengeFormProps) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);
  const [tagInput, setTagInput] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagError, setTagError] = React.useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      duration: 7,
      maxParticipants: 0,
      frequencyType: "DAILY",
      checkInsPerWeek: undefined,
    },
  });

  const freq = form.watch("frequencyType");
  const durationDays = form.watch("duration") || 0;
  const currentWeeks = Math.max(1, Math.round(durationDays / 7));

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    setTagError("");
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      if (tags.length >= MAX_TAGS) {
        setTagError(`Maximum of ${MAX_TAGS} tags allowed`);
        return;
      }
      const newTag = tagInput.trim().replace(/,$/, "");
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
    setTagError("");
  };

  const getRequiredCheckIns = (
    duration: number,
    frequencyType: "DAILY" | "WEEKLY",
    checkInsPerWeek?: number
  ): number => {
    if (frequencyType === "DAILY") {
      // For daily challenges, required check-ins = duration in days
      return duration;
    } else {
      // For weekly challenges, calculate based on weeks and check-ins per week
      const weeks = Math.ceil(duration / 7);
      return weeks * (checkInsPerWeek || 1); // Default to 1 if undefined
    }
  };

  const onSubmit = (formData: FormData) => {
    if (!user?.id) {
      alert("You must be signed in to create a challenge.");
      return;
    }
    if (tags.length > MAX_TAGS) {
      setTagError("Maximum of 3 tags allowed");
      return;
    }
    const requiredCheckIns = getRequiredCheckIns(
      formData.duration,
      formData.frequencyType,
      formData.checkInsPerWeek
    );

    console.log("Creating challenge...");
    setIsLoading(true);

    const challengeData: ChallengeData = {
      ...formData,

      // calculated here
      creatorId: user.id,
      requiredCheckIns: requiredCheckIns,
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
          if (setShowCreateForm) setShowCreateForm(false); // Close modal on submit
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
    <div className="w-full p-2 pb-20">
      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-500"></div>
        </div>
      )}
      {!isLoading && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 bg-white dark:bg-blue-800/15 shadow-lg p-4"
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
                      className=" bg-white dark:bg-slate-800/15 border-gray-300 dark:border-slate-800 text-gray-800 dark:text-white p-6 text-sm"
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
                      className="resize-none  bg-white dark:bg-slate-800/15 border-gray-300  dark:border-slate-800 text-gray-800 dark:text-white p-6 text-sm "
                      placeholder="Describe the challenge goals, rules, etc."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
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
                      <FormLabel className="text-gray-700 dark:text-gray-200 ">
                        Start Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between font-normal bg-white dark:bg-slate-800/30  border-gray-300  dark:border-slate-800 text-gray-800 dark:text-white p-6"
                            type="button"
                          >
                            {field.value ? field.value : "Select date"}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0 border-2 dark:border-blue-950/50"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={valueAsDate}
                            captionLayout="dropdown"
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
                              today.setHours(0, 0, 0, 0); // Reset time to start of day

                              const tomorrow = new Date(today);
                              tomorrow.setDate(today.getDate() + 1); // At least 1 day away

                              const maxDate = new Date(today);
                              maxDate.setDate(today.getDate() + 14); // At max 2 weeks away

                              return date < tomorrow || date > maxDate;
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  );
                }}
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
                        min={1}
                        max={20}
                        className=" bg-white  border-gray-300 dark:bg-slate-800/30 dark:border-slate-800 text-gray-800 dark:text-white  p-6 "
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
            {Number(form.watch("maxParticipants")) > 20 && (
              <div className="text-red-500 text-sm mt-1">
                Max participants cannot exceed 20.
              </div>
            )}

            {/* Frequency */}
            <FormField
              control={form.control}
              name="frequencyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-600">
                    SweatCheck Frequency
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-2 grid grid-cols-2 gap-4">
                      {/* DAILY */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="DAILY"
                          checked={field.value === "DAILY"}
                          onChange={() => {
                            field.onChange("DAILY");
                            form.setValue("checkInsPerWeek", undefined, {
                              shouldValidate: true,
                            });
                          }}
                          className="w-4 h-4 accent-pink-500"
                        />
                        <span className="text-gray-800 dark:text-gray-200 font-medium">
                          Daily
                        </span>
                      </label>

                      {/* WEEKLY */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="WEEKLY"
                          checked={field.value === "WEEKLY"}
                          onChange={() => field.onChange("WEEKLY")}
                          className="w-4 h-4 accent-violet-500"
                        />
                        <span className="text-gray-800 dark:text-gray-200 font-medium">
                          Weekly
                        </span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Duration: switch UI based on frequency */}
            {freq === "DAILY" ? (
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
                        placeholder="e.g. 7"
                        className="bg-white dark:bg-slate-800/30 border-gray-300 dark:border-slate-800 text-gray-800 dark:text-white p-6"
                        {...field}
                        onChange={(e) => {
                          const v = e.target.value.replace(/^0+/, "");
                          field.onChange(v === "" ? "" : Number(v));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-200">
                  Duration (weeks)
                </FormLabel>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={2}
                    max={4}
                    className="w-24 bg-white dark:bg-slate-800/30 border-gray-300 dark:border-slate-800 text-gray-800 dark:text-white rounded-lg p-2 text-sm"
                    value={currentWeeks}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/^0+/, "");
                      const weeks = raw === "" ? NaN : Number(raw);
                      const clamped = Number.isFinite(weeks)
                        ? Math.max(2, Math.min(weeks, 4))
                        : 2;
                      form.setValue("duration", clamped * 7, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    *Weekly challenge must be at least 14 weeks long
                  </span>
                </div>

                <FormMessage />
              </FormItem>
            )}

            {/* Check-ins per week (only for WEEKLY) */}
            {freq === "WEEKLY" && (
              <FormField
                control={form.control}
                name="checkInsPerWeek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">
                      Check-ins per week
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={7}
                        placeholder="e.g. 3"
                        className="w-24 bg-white dark:bg-slate-800/30 border-gray-300 dark:border-slate-800 text-gray-800 dark:text-white rounded-lg p-2 text-sm"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const v = e.target.value.replace(/^0+/, "");
                          field.onChange(v === "" ? undefined : Number(v));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200 text-sm">
                    Tags (optional)
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      {/* Predefined Tag Buttons */}
                      <div className="flex flex-wrap gap-2 text-xs">
                        {[
                          "cardio",
                          "weight",
                          "glute",
                          "strength",
                          "yoga",
                          "running",
                        ].map((predefinedTag) => (
                          <button
                            key={predefinedTag}
                            type="button"
                            onClick={() => {
                              if (tags.includes(predefinedTag)) {
                                // Remove tag if already selected
                                setTags(
                                  tags.filter((t) => t !== predefinedTag)
                                );
                              } else if (tags.length < MAX_TAGS) {
                                setTags([...tags, predefinedTag]);
                              } else {
                                setTagError("Maximum of 3 tags allowed");
                              }
                            }}
                            className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                              tags.includes(predefinedTag)
                                ? "bg-violet-600 text-white shadow-md"
                                : "bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600"
                            }`}
                          >
                            {predefinedTag}
                            {tags.includes(predefinedTag) && (
                              <span className="ml-1">✓</span>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Custom Tag Input with Add Button */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={handleTagInput}
                          onKeyDown={handleTagKeyDown}
                          className="flex-1 bg-white dark:bg-slate-800/30 border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                          placeholder="Custom tag..."
                          disabled={tags.length >= MAX_TAGS}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newTag = tagInput.trim();
                            if (
                              newTag &&
                              !tags.includes(newTag) &&
                              tags.length < MAX_TAGS
                            ) {
                              setTags([...tags, newTag]);
                              setTagInput("");
                              setTagError("");
                            } else if (tags.length >= MAX_TAGS) {
                              setTagError("Maximum of 3 tags allowed");
                            }
                          }}
                          disabled={!tagInput.trim() || tags.length >= MAX_TAGS}
                          className="px-4 py-2 bg-violet-600 dark:bg-blue-950 text-white rounded-lg text-sm font-medium disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-violet-700 transition-colors"
                        >
                          Add
                        </button>
                      </div>

                      {/* Selected Tags Display */}
                      {tags.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Selected ({tags.length}/{MAX_TAGS}):
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                              <span
                                key={tag}
                                className="flex items-center gap-2 px-3 py-2 rounded-full bg-violet-600/20 text-violet-700 dark:text-violet-300 text-sm font-medium border border-violet-300 dark:border-violet-600"
                              >
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => removeTag(tag)}
                                  className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-600/30 hover:bg-violet-600/50 transition-colors"
                                  aria-label={`Remove ${tag} tag`}
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  {tagError && (
                    <div className="text-xs text-red-400 mt-1">{tagError}</div>
                  )}
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
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

            <div className="flex gap-2">
              <Button
                type="button"
                variant="destructive"
                className="w-1/8 bg-red-500/50 text-[8px]"
                onClick={() => setShowCreateForm && setShowCreateForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outline"
                className="w-7/8  bg-blue-800/50 border border-blue-600 text-xs "
              >
                Create Challenge
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default CreateChallengeForm;
