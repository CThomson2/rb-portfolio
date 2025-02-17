"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

// Form validation schema
const formSchema = z.object({
  still: z.string({
    required_error: "Please select a still.",
  }),
  mfr: z.string().min(1, "Manufacturer is required"),
  material: z.string().min(1, "Material is required"),
  drumId: z.number({
    required_error: "Drum ID is required",
  }),
  date: z.string().min(1, "Date is required"),
  transport: z.string().length(2, "Transport initials must be 2 characters"),
  loader: z.string().length(2, "Loader initials must be 2 characters"),
  operator: z.string().length(2, "Operator initials must be 2 characters"),
});

type InitialInfoFormValues = z.infer<typeof formSchema>;

interface InitialInfoProps {
  onSubmit: (values: InitialInfoFormValues) => void;
}

/**
 * Renders the first step ("Initial Info") of a multi-page production form wizard.
 *
 * This form collects basic information about the distillation process, including:
 *   - Which still will be used
 *   - The material and its manufacturer
 *   - The drum ID from which the material is drawn
 *   - The date of the process
 *   - Initials for transport, loader, and operator (2-character each)
 *
 * Validation is handled via Zod, ensuring required fields and correct data types.
 *
 * @param {Object} props
 * @param {(values: InitialInfoFormValues) => void} props.onSubmit
 *   Callback fired when the user successfully submits the form.
 *   Receives a strongly-typed `InitialInfoFormValues` object.
 *
 * @returns {JSX.Element} A form component allowing users to enter initial process details
 *                        and proceed to the next step of the production workflow.
 */
export function InitialInfo({ onSubmit }: InitialInfoProps): JSX.Element {
  const form = useForm<InitialInfoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: format(new Date(), "yyyy-MM-dd"),
      transport: "",
      loader: "",
      operator: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Still Selection */}
          <FormField
            control={form.control}
            name="still"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Still</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select still" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="still1">Still 1</SelectItem>
                    <SelectItem value="still2">Still 2</SelectItem>
                    <SelectItem value="still3">Still 3</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* MFR Input */}
          <FormField
            control={form.control}
            name="mfr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manufacturer</FormLabel>
                <FormControl>
                  <Input placeholder="Enter manufacturer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Material Input */}
          <FormField
            control={form.control}
            name="material"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material</FormLabel>
                <FormControl>
                  <Input placeholder="Enter material" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Drum ID Input */}
          <FormField
            control={form.control}
            name="drumId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drum ID</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter drum ID"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Date Input */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Employee Initials Section */}
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="transport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transport</FormLabel>
                <FormControl>
                  <Input
                    placeholder="XX"
                    maxLength={2}
                    className="w-20 text-center uppercase"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="loader"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loader</FormLabel>
                <FormControl>
                  <Input
                    placeholder="XX"
                    maxLength={2}
                    className="w-20 text-center uppercase"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="operator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Operator/2nd Check</FormLabel>
                <FormControl>
                  <Input
                    placeholder="XX"
                    maxLength={2}
                    className="w-20 text-center uppercase"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Next
        </Button>
      </form>
    </Form>
  );
}
