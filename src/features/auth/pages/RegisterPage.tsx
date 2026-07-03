"use client"



import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Eye, EyeOffIcon } from "lucide-react"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { signUpSchema, type SignUpSchema } from "../schemas"
import { useRegisterMutation } from "../authApi"
import { toast } from "sonner"
import { handleApiError } from "@/lib/error"
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
  const nav = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [register, { isLoading: isPending }] = useRegisterMutation();
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },

  })

  async function onSubmit(data: SignUpSchema) {
    try {
      await register(data).unwrap();
      toast.success("Registration successful");
      nav("/login", { replace: true });
    } catch (error) {
      toast.error(handleApiError(error));

    }
  }

  return (
    <div className="mx-auto max-w-md w-full mt-20">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)}>


            <FieldGroup>
              <Controller
                name="fullname"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-name">
                      Full Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                      autoComplete="off"

                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />


              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-email">
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      id="form-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="john@gmail.com"
                      autoComplete="off"

                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />



              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-password">
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        id="form-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="********"
                        autoComplete="off"

                      />
                      <Button type="button" variant={'ghost'} className="absolute right-3   text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOffIcon size={18} /> : <Eye size={18} />}
                      </Button>

                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />



            </FieldGroup>






          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              disabled={isPending}
              className="cursor-pointer w-full" type="submit" form="sign-up-form">
              {isPending ? <Spinner /> : "Sign up"}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}





