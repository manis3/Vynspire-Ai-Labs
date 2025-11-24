"use client";
import Card from "@/components/ui/card/default";
import { InputWithErrorMessage } from "@/components/ui/input";
import useLogin from "./hooks/useLogin";
import { ButtonWithLoader } from "@/components/ui/button";

export default function Login() {
  const { register, handleSubmit, errors, onSubmit } = useLogin();
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card
        colorScheme={"primary"}
        padding={"20px"}
        border={"border"}
        borderRadius={"lg"}
        className="inline-flex mx-auto text-text-Primary flex-col gap-4"
      >
        <div className="text-2xl font-bold mx-auto font-roboto ">Login</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-6 "
        >
          <div className="flex flex-col items-center justify-center gap-6 py-4">
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
          </div>
          <ButtonWithLoader
            buttonWithLoaderClassName="!w-full rounded-sm font-inter font-medium text-sm text-text leading-6"
            type={"submit"}
            // loading={isUserLogginIn}
          >
            Login
          </ButtonWithLoader>
        </form>
      </Card>
    </div>
  );
}
