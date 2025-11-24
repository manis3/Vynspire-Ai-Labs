"use client";
import FormWrapper from "@/components/ui/form/formWrapper";
import { InputWithErrorMessage } from "@/components/ui/input";
import { inputFields } from "@/consts/user/user-consts";
import useSignup from "./hooks/useSignup";
import { ButtonWithLoader } from "@/components/ui/button";

export default function Signup() {
  const { handleSubmit, onSubmit, register, errors } = useSignup();
  return (
    <FormWrapper title="Signup">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2 p-4"
      >
        <div className="flex gap-6">
          <InputWithErrorMessage
            label="First Name"
            error={errors.firstName}
            register={register}
            name={"firstName"}
            className=" rounded-sm"
            placeholder="john"
            type="text"
          />
          <InputWithErrorMessage
            label="Last Name"
            error={errors.lastName}
            register={register}
            name={"lastName"}
            className=" rounded-sm"
            placeholder="Doe"
            type="text"
          />
        </div>
        <InputWithErrorMessage
          label="Email"
          error={errors.email}
          register={register}
          name={"email"}
          className="rounded-sm"
          placeholder="johndoe@gmail.com"
          type="email"
        />
        <div className="flex gap-6">
          <InputWithErrorMessage
            label="Password"
            error={errors.password}
            register={register}
            name={"password"}
            className="rounded-sm"
            placeholder="**********"
            type="password"
          />
          <InputWithErrorMessage
            label="Confirm Password"
            error={errors.confirmPassword}
            register={register}
            name={"confirmPassword"}
            className=" rounded-sm"
            placeholder="***********"
            type="password"
          />
        </div>
        <InputWithErrorMessage
          label="Phone Number"
          error={errors.phoneNumber}
          register={register}
          name={"phoneNumber"}
          className="rounded-sm"
          placeholder="123456789"
          type="number"
        />
        <InputWithErrorMessage
          label="Address"
          error={errors.address}
          register={register}
          name={"address"}
          className=" rounded-sm"
          placeholder=""
          type="text"
        />

        <div className="inline-flex justify-end gap-4 mt-4 flex-col lg:flex-row">
          <ButtonWithLoader variant={"secondary"}>Back</ButtonWithLoader>
          <ButtonWithLoader
            buttonWithLoaderClassName="text-text"
            type="submit"
            //   loading={isLoading}
          >
            Sign up
          </ButtonWithLoader>
        </div>
      </form>
    </FormWrapper>
  );
}
