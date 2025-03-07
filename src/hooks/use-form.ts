import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm as useReactHookForm,
  type UseFormProps as UseReactHookFormProps,
  type UseFormReturn,
} from "react-hook-form";
import { type z } from "zod";

type UseFormProps<Schema extends z.ZodSchema> = Omit<
  UseReactHookFormProps<z.infer<Schema>>,
  "resolver"
> & {
  schema: Schema;
};

export default function useForm<S extends z.ZodType>({
  schema,
  ...rest
}: UseFormProps<S>): UseFormReturn<z.infer<S>> {
  return useReactHookForm<z.infer<S>>({
    resolver: zodResolver(schema),
    ...rest,
  });
}
