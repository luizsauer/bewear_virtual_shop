"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z
  .object({
    name: z.string("Nome inválido.").trim().min(3, "Nome é obrigatório."),
    email: z.email("E-mail inválido.").trim().min(3, "E-mail é obrigatório."),
    password: z.string("Senha inválida.").min(8, "Senha curta."),
    confirmPassword: z
      .string("Confirmação de senha inválida.")
      .min(8, "Confirmação de senha curta."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"], // indica em qual campo mostrar o erro
  });
type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: FormValues) {
    await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Account created successfully!");
          router.push("/");
        },
        onError: (error) => {
          if (error.error.code === "auth/email-already-in-use") {
            toast.error("Email already in use.");
            return;
          } else if (error.error.code === "auth/invalid-email") {
            toast.error("Invalid email.");
            return;
          }
          toast.error(error.error.message || "Failed to create account.");
          form.setError("email", {
            message: error.error.message || "Failed to create account.",
          });
        },
      },
    });
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>New Account</CardTitle>
          <CardDescription> Create your account here. </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Create Account</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};
export default SignUpForm;

<Card>
  <CardHeader>
    <CardTitle>New Account</CardTitle>
    <CardDescription>
      Create your account here. After you save, you will be logged out.
    </CardDescription>
  </CardHeader>
  <CardContent className="grid gap-6">
    <div className="grid gap-3">
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Enter your name" />
    </div>
    <div className="grid gap-3">
      <Label htmlFor="email">E-mail</Label>
      <Input id="email" placeholder="Enter your email" />
    </div>
    <div className="grid gap-3">
      <Label htmlFor="tabs-demo-current">Password</Label>
      <Input
        id="tabs-demo-current"
        type="password"
        placeholder="Enter your password"
      />
    </div>
    <div className="grid gap-3">
      <Label htmlFor="tabs-demo-new">Confirm Password</Label>
      <Input
        id="tabs-demo-new"
        type="password"
        placeholder="Confirm your password"
      />
    </div>
  </CardContent>
  <CardFooter>
    <Button>Create Account</Button>
  </CardFooter>
</Card>;
