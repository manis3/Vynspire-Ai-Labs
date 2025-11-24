import { Spinner } from "@/assets/svgs";

export function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center animate-spin text-text">
      <Spinner className="w-4 h-4 text-text" />
    </div>
  );
}
