"use client";
import { InputWithErrorMessage } from "@/components/ui/input";
import useLogin from "./hooks/useLogin";
import { ButtonWithLoader } from "@/components/ui/button";
import FormWrapper from "@/components/ui/form/formWrapper";
import Link from "next/link";

export default function Login() {
  const { register, handleSubmit, errors, onSubmit, isUsingBeingAuthenticate } =
    useLogin();
  return (
    <FormWrapper title="Login">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-"
      >
        <div className="flex flex-col items-center justify-center gap-6 py-4  ">
          <InputWithErrorMessage
            label="Email/UserName"
            error={errors.email}
            register={register}
            name={"email"}
            className="w-[225px] sm:w-[300px] lg:w-[333px] rounded-sm"
            placeholder="johndoe@gmail.com"
            type="email"
          />
          <InputWithErrorMessage
            label="Password"
            name={"password"}
            className="w-[225px] sm:w-[300px] lg:w-[333px] rounded-sm"
            error={errors.password}
            register={register}
            placeholder="*****************"
            type="Password"
          />
          <Link
            href="/signup"
            className="w-full text-end hover:underline underline-offset-2"
          >
            Create New Account
          </Link>
        </div>
        <ButtonWithLoader
          buttonWithLoaderClassName="!w-full rounded-sm font-inter font-medium  text-sm  leading-6"
          type={"submit"}
          buttonTextClassName="text-text"
          loading={isUsingBeingAuthenticate}
        >
          Login
        </ButtonWithLoader>
      </form>
    </FormWrapper>
  );
}
