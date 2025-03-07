"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import cn from "@/libs/cn";

export type RadioGroupProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Root
>;

/**
 * @example
 * <RadioGroup>
 *   <RadioGroupField>
 *     <RadioGroupItem id="apple" value="apple" />
 *     <Label htmlFor="apple">Apple</Label>
 *     <p>Description</p>
 *   </RadioGroupField>
 *   <RadioGroupField>
 *     <RadioGroupItem id="banana" value="banana" />
 *     <Label htmlFor="banana">Banana</Label>
 *     <p>Description</p>
 *   </RadioGroupField>
 * </RadioGroup>
 *
 * @example <caption>with Form</caption>
 * <FormField
 *   control={form.control}
 *   name="items"
 *   render={({ field }) => (
 *     <FormItem>
 *       <FormLabel>Items</FormLabel>
 *       <FormControl>
 *         <RadioGroup
 *           className="mt-4"
 *           onValueChange={field.onChange}
 *           defaultValue={field.value}
 *         >
 *           {items.map((item) => (
 *             <FormItem key={item.id}>
 *               <RadioGroupField>
 *                 <FormControl>
 *                   <RadioGroupItem value={item.id} />
 *                 </FormControl>
 *                 <FormLabel>{item.label}</FormLabel>
 *                 <FormDescription>{item.description}</FormDescription>
 *               </RadioGroupField>
 *             </FormItem>
 *           ))}
 *         </RadioGroup>
 *       </FormControl>
 *     </FormItem>
 *   )}
 * />
 */
export function RadioGroup({ className, ...rest }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-4", className)}
      {...rest}
    />
  );
}

export type RadioGroupFieldProps = React.ComponentProps<"div">;
export function RadioGroupField({ className, ...rest }: RadioGroupFieldProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1",
        "[&>[role=radio]]:col-start-1 [&>[role=radio]]:row-start-1 [&>[role=radio]]:items-center [&>[role=radio]]:justify-self-start",
        "[&>label]:col-start-2 [&>label]:row-start-1 [&>label]:items-center [&>label]:justify-self-start",
        "[&>p]:text-muted-foreground [&>p]:col-start-2 [&>p]:row-start-2 [&>p]:items-center [&>p]:justify-self-start [&>p]:text-sm",
        className,
      )}
      {...rest}
    />
  );
}

export type RadioGroupItemProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
>;
export function RadioGroupItem({ className, ...rest }: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "relative flex aspect-square h-4.5 w-4.5 items-center justify-center rounded-full border shadow-sm",
        "hover:after:bg-primary/10 after:absolute after:h-2 after:w-2 after:rounded-full after:transition-colors",
        "data-[state=checked]:border-transparent data-[state=checked]:after:bg-transparent",
        "focus-visible:ring-ring ring-offset-2 focus-visible:ring-2 focus-visible:outline-none",
        className,
      )}
      {...rest}
    >
      <RadioGroupPrimitive.Indicator
        className={cn(
          "relative flex h-full w-full items-center justify-center",
          "before:bg-primary before:absolute before:h-4.5 before:w-4.5 before:rounded-full",
          "after:bg-primary-foreground after:absolute after:h-2 after:w-2 after:rounded-full",
        )}
      />
    </RadioGroupPrimitive.Item>
  );
}
