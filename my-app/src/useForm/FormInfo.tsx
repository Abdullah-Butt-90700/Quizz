import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import App from "../App";
import * as z from "zod";
const userSchema = z.object({
  name: z
    .string()
    .min(2, "A name should have more then 2 letters")
    .max(30, "A name should not be above 30 letters")
    .regex(/^[A-Za-z]+$/, "Only alphabetic characters are allowed"),
  email: z.string().email("Invalid Adress"),
});

type FormData = z.infer<typeof userSchema>;

const Form: React.FC = () => {
  const method = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {},
  });

  return (
    <FormProvider {...method}>
      <App />
    </FormProvider>
  );
};

export default Form;
