"use client";

import React from "react";

import { Slot } from "@radix-ui/react-slot";
import {
  Controller as ReactHookFormController,
  type ControllerProps as ReactHookFormControllerProps,
  type FieldPath as ReactHookFormFieldPath,
  type FieldValues as ReactHookFormFieldValues,
  FormProvider as ReactHookFormProvider,
  useFormContext as useReactHookFormContext,
} from "react-hook-form";

import cn from "@/libs/cn";

import { Label } from "./label";

// Form ---------------------------------------------------------------------
/**
 * @example
 * <Form {...form}>
 *   <FormField
 *     control={form.control}
 *     name="username"
 *     render={({ field }) => (
 *       <FormItem>
 *         <FormLabel>Username</FormLabel>
 *         <FormControl>
 *           {Your form field}
 *         </FormControl>
 *         <FormDescription>
 *           This is your public display name.
 *         </FormDescription>
 *         <FormMessage />
 *       </FormItem>
 *     )}
 *   />
 * </Form>
 */
export const Form = ReactHookFormProvider;

// FormField -------------------------------------------------------------
type FormFieldContextValue<
  TFieldValues extends ReactHookFormFieldValues = ReactHookFormFieldValues,
  TName extends
    ReactHookFormFieldPath<TFieldValues> = ReactHookFormFieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({
  name: "",
});

export function FormField<
  TFieldValues extends ReactHookFormFieldValues = ReactHookFormFieldValues,
  TName extends
    ReactHookFormFieldPath<TFieldValues> = ReactHookFormFieldPath<TFieldValues>,
>({ ...props }: ReactHookFormControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <ReactHookFormController {...props} />
    </FormFieldContext.Provider>
  );
}

export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useReactHookFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}

// FormItem -------------------------------------------------------------
type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({
  id: "",
});

export function FormItem({
  ref,
  className,
  ...rest
}: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        ref={ref}
        className={cn("flex flex-col gap-2", className)}
        {...rest}
      />
    </FormItemContext.Provider>
  );
}

// FormLabel -------------------------------------------------------------
export function FormLabel({
  className,
  ...rest
}: React.ComponentProps<typeof Label>) {
  const { error, formItemId } = useFormField();
  return (
    <Label
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...rest}
    />
  );
}

// FormControl -------------------------------------------------------------
export function FormControl({ ...rest }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...rest}
    />
  );
}

// FormDescription -------------------------------------------------------------
export function FormDescription({
  className,
  ...rest
}: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();
  return (
    <p
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...rest}
    />
  );
}

// FormMessage -------------------------------------------------------------
export function FormMessage({
  children,
  className,
  ...rest
}: React.ComponentPropsWithRef<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      id={formMessageId}
      className={cn("text-destructive text-sm font-medium", className)}
      {...rest}
    >
      {body}
    </p>
  );
}
