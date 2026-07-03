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
import { loginSchema, type LoginSchema } from "../schemas"
import { useAuth } from "@/hooks/useAuth"

function LoginPage() {

  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },

  })

  const { login, isLoading } = useAuth();

  function onSubmit(data: LoginSchema) {
    login(data);
  }

  return (
    <div className="mx-auto max-w-md w-full mt-20 lg:mb-0 mb-20">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>

            <FieldGroup>
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
              disabled={isLoading}
              className="cursor-pointer w-full" type="submit" form="login-form">
              {isLoading ? <Spinner /> : "Login"}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}




export default LoginPage;
