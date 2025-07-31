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
  tags: z.array(z.enum(["cardio", "weight", "glute"])).optional(),
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
const MAX_TAGS = 3;

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
    },
  });

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    setTagError("");
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      if (tags.length >= MAX_TAGS) {
        setTagError("Maximum of 3 tags allowed");
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

  const onSubmit = (formData: FormData) => {
    if (!user?.id) {
      alert("You must be signed in to create a challenge.");
      return;
    }
    if (tags.length > MAX_TAGS) {
      setTagError("Maximum of 3 tags allowed");
      return;
    }

    console.log("Creating challenge...");
    setIsLoading(true);

    const endDate = calculateEndDate(formData.startDate, formData.duration);

    const challengeData: ChallengeData = {
      ...formData,
      tags,
      endDate, // calculated here
      creatorId: user.id,
      participants: [],
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
            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    Tags (optional)
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap items-center gap-2 bg-transparent rounded-xl min-h-[48px] px-3 py-2 border border-gray-300 dark:border-slate-600 focus-within:ring-2 focus-within:ring-violet-500 transition">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-3 py-1 rounded-full bg-violet-600/20 text-violet-300 text-sm font-medium"
                        >
                          {tag}
                          <button
                            type="button"
                            className="ml-1 focus:outline-none group"
                            tabIndex={-1}
                            onClick={() => removeTag(tag)}
                          >
                            <X className="w-4 h-4 text-violet-400 group-hover:text-violet-500 transition-colors" />
                          </button>
                        </span>
                      ))}
                      {tags.length < MAX_TAGS && (
                        <input
                          type="text"
                          value={tagInput}
                          onChange={handleTagInput}
                          onKeyDown={handleTagKeyDown}
                          className="bg-transparent outline-none border-none text-violet-300 placeholder-violet-400 flex-1 min-w-[80px] py-1 px-2 text-sm"
                          placeholder={
                            tags.length === 0
                              ? "Add a tag and press Enter or Comma"
                              : ""
                          }
                          disabled={tags.length >= MAX_TAGS}
                        />
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
                variant="ghost"
                className="w-1/2 text-md py-2 border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
                onClick={() => setShowCreateForm && setShowCreateForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outline"
                className="w-1/2 text-md py-2 border border-purple-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all dark:shadow-[0_0_10px_2px_rgba(168,85,247,0.4)]"
              >
                🏁 Create & Compete
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default CreateChallengeForm;
