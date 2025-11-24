import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position={"top-right"}
      className="toaster group "
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group toast group-[.toaster]:border-border group-[.toaster]:shadow-lg px-6 py-1 rounded-2 w-full",
          error:
            "group toast group-[.toaster]:text-text-error group-[.toaster]:bg-[#fdf0f0] group-[.toaster]:shadow-lg group-[.toaster]:border-border px-4 py-4 rounded-2 flex items-center justify-start gap-3",
          success:
            "group toast group-[.toaster]:!bg-[#f0f9ec] group-[.toaster]:text-text-success group-[.toaster]:shadow-lg group-[.toaster]:border-border px-4 py-4 rounded-2 flex items-center justify-start gap-3",
          warning:
            "group toast group-[.toaster]:text-text-warning group-[.toaster]:!bg-[#fcf6ed] group-[.toaster]:shadow-lg group-[.toaster]:border-border px-4 py-4 rounded-2 flex items-center justify-start gap-3",
          info: "group toast group-[.toaster]:text-text group-[.toaster]:bg-text-link group-[.toaster]:shadow-lg group-[.toaster]:border-border px-4 py-1 rounded-2 flex items-center justify-start gap-3",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
