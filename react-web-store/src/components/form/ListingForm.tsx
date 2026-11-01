import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listingSchema, type ListingValues } from "../../schemas";
import FormField from "./FormField";

type ListingFormProps = {
  defaultValues?: ListingValues;
  submitLabel: string;
  onSubmit: (values: ListingValues) => Promise<unknown>;
};

export default function ListingForm({
  defaultValues,
  submitLabel,
  onSubmit,
}: ListingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ListingValues>({
    resolver: zodResolver(listingSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4 card p-6"
    >
      <FormField label="Product name" error={errors.title?.message}>
        <input className="input" {...register("title")} />
      </FormField>

      <FormField label="Price (USD)" error={errors.price?.message}>
        <input
          type="number"
          step="0.01"
          min="0"
          className="input"
          {...register("price", { valueAsNumber: true })}
        />
      </FormField>

      <FormField label="Description" error={errors.description?.message}>
        <textarea
          rows={5}
          className="input resize-y"
          {...register("description")}
        />
      </FormField>

      <FormField label="Image URL" error={errors.imageurl?.message}>
        <input
          type="url"
          placeholder="https://..."
          className="input"
          {...register("imageurl")}
        />
      </FormField>

      <button
        type="submit"
        className="btn self-start btn-solid"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
