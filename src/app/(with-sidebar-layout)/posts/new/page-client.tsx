import clientEnv from "@/config/client-env";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewPostPageClient() {
  return (
    <div className="flex flex-col p-8">
      <h1 className="sr-only">New Product Post</h1>
      <form className="flex flex-col">
        <div className="text-3xl font-bold">New Product Post</div>
        <p className="mt-2 text-base/6 md:text-sm">
          Introduce a product that you believe deserves attention.
          {/* Please share the details about the product!  */} If you need
          assistance, feel free to reach out to us on{" "}
          <a
            href={clientEnv.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link underline underline-offset-2"
          >
            Discord
          </a>
          .
        </p>

        <h2 className="mt-10 mb-4 text-2xl font-bold">✍️ Product Info</h2>
        <div className="flex flex-col gap-6">
          <div>
            <Label>Product Name</Label>
            <Input required autoComplete="off" />
          </div>

          <div>
            <Label>Description</Label>
            <p> Provide a brief overview of the product</p>
            <Textarea required autoComplete="off" />
          </div>

          <div>
            <Label>Link</Label>
            <p> Provide the product’s website or link</p>
            <Input required autoComplete="off" />
          </div>
        </div>

        <h2 className="mt-10 mb-4 text-2xl font-bold">
          😀 Tell us more about this product
        </h2>
        <div className="flex flex-col gap-6">TODO</div>

        <div className="pt-10 pb-4">
          <Button type="submit" size="lg" className="w-full">
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
}
