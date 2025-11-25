import { EditIcon, TrashIcon } from "@/assets/svgs";
import { ButtonWithLoader } from "../button";
import Card from "../card/default";
import { BlogCardProps } from "./types/blogCard.types";

export function Tags({ tag }: { tag: string }) {
  return (
    <span
      key={tag}
      className="px-2 py-1 bg-background text-text-Primary text-xs rounded font-roboto"
    >
      {tag}
    </span>
  );
}

export default function BlogCard({
  title,
  content,
  tags = [],
  onEdit,
  onDelete,
  id,
  isLoading,
}: BlogCardProps) {
  const handleEdit = () => {
    if (onEdit) {
      console.log("this functio has been called");
      onEdit(id);
    }
  };
  return (
    <Card
      colorScheme="secondary"
      shadow="md"
      borderRadius="lg"
      padding="20px"
      className="flex flex-col gap-y-3"
    >
      <h2 className="text-xl text-text-Primary font-semibold font-roboto">
        {title}
      </h2>

      <div className="flex flex-col flex-1 space-y-5">
        <p
          className="flex-1 text-sm text-gray-600 font-roboto"
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Tags key={index} tag={tag} />
            ))}
          </div>
        )}
      </div>

      <div className="w-full flex gap-3 pt-2  justify-end">
        <ButtonWithLoader
          size={"lg"}
          onClick={handleEdit}
          className="inline-flex text-white"
        >
          <EditIcon />
        </ButtonWithLoader>
        <ButtonWithLoader
          size={"lg"}
          onClick={() => onDelete?.(id)}
          className="inline-flex text-white"
          loading={isLoading}
        >
          <TrashIcon />
        </ButtonWithLoader>
      </div>
    </Card>
  );
}
