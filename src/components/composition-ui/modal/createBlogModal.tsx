"use client";
import { InputWithErrorMessage } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal/default";
import { RichTextEditor } from "@/components/ui/textEditor/richTextEditor";
import Select from "react-select";
import useCreateNewBlog from "@/features/blogs/hooks/useCreateNewBlog";
import { Controller } from "react-hook-form";
import { ButtonWithLoader } from "@/components/ui/button";

function Title({ title }: { title: string }) {
  return (
    <label htmlFor="title" className="text-text-Primary text-xl">
      {title}
    </label>
  );
}

export default function CreateBlogModal({
  isOpen,
  closeModal,
  tagOptions,
}: {
  isOpen: boolean;
  closeModal: () => void;
  tagOptions: string[];
}) {
  const {
    handleSubmit,
    onSubmit,
    register,
    control,
    errors,
    isNewBlogBeingCreated,
    blogId,
    handleCloseModal,
    isBlogBeingUpdated,
  } = useCreateNewBlog(closeModal);
  const options = tagOptions.map((tag) => ({ label: tag, value: tag }));

  return (
    <Modal
      isOpen={isOpen}
      closeModal={handleCloseModal}
      title="Create New Blog"
      className="w-[600px]"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-"
      >
        <div className="p-6 flex flex-col gap-6">
          <InputWithErrorMessage
            label="Title"
            labelClassName="text-text-Primary text-xl font-roboto placeholder:text-text-secondary "
            name={"title"}
            className="rounded-sm "
            error={errors.title}
            register={register}
            placeholder="Enter ..."
            type="text"
          />
          <div className="flex flex-col space-y-4">
            <Title title="Content" />
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <div onClick={(e) => e.preventDefault()}>
                  <RichTextEditor
                    key={blogId || "new"}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </div>
              )}
            />
            {errors.content && (
              <p className="text-error text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <Title title="Tags" />
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <div onClick={(e) => e.preventDefault()}>
                  <Select
                    {...field}
                    options={options}
                    isMulti
                    closeMenuOnSelect={false}
                    placeholder="Select tags..."
                    classNamePrefix="react-select"
                    onChange={(value) => field.onChange(value)}
                    value={field.value}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        color: "black",
                        width: "100%",
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        color: state?.isSelected ? "#2c3a77" : "#000000",
                        backgroundColor: state.isSelected
                          ? "#00AEEC"
                          : "#ffffff",
                      }),
                    }}
                  />
                </div>
              )}
            />
            {errors.tags && (
              <p className="text-error text-sm mt-1">{errors.tags.message}</p>
            )}
          </div>
          <div className="inline-flex  gap-4">
            {blogId && (
              <ButtonWithLoader
                variant={"outline"}
                buttonWithLoaderClassName="!w-full rounded-sm font-inter font-medium  text-sm  leading-6"
                onClick={handleCloseModal}
                size={"lg"}
                buttonTextClassName="text-text-Primary"
              >
                Cancel
              </ButtonWithLoader>
            )}
            <ButtonWithLoader
              buttonWithLoaderClassName="!w-full rounded-sm font-inter font-medium  text-sm  leading-6"
              type={"submit"}
              size={"lg"}
              buttonTextClassName="text-text"
              loading={isNewBlogBeingCreated || isBlogBeingUpdated}
            >
              {blogId ? "Update" : "Create"}
            </ButtonWithLoader>
          </div>
        </div>
      </form>
    </Modal>
  );
}
