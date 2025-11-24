import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal/default";
import { RichTextEditor } from "@/components/ui/textEditor/richTextEditor";
import { useState } from "react";

export default function CreateBlogModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const [content, setContent] = useState("");

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      title="Create New Blog"
      className="w-[600px]"
    >
      <div className="p-4">
        <label htmlFor="title" className="text-text-Primary text-xl">
          Title
        </label>
        <Input />
        <div>
          <p className="text-text-Primary text-xl py-4">Content</p>
          <RichTextEditor value={content} onChange={setContent} />
        </div>
      </div>
    </Modal>
  );
}
