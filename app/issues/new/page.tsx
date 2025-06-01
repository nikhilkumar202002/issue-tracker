'use client';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, Callout, Text } from "@radix-ui/themes";
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema"
import { z } from "zod"
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {

  const router = useRouter();
  const {register,control,handleSubmit, formState: {errors}} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState('');

  return (
    <div className="max-w-xl ">
      {
        error &&
        <Callout.Root color="red" className="mb-5">
            <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      }
    <form 
      className="max-w-xl space-y-3" 
       onSubmit={handleSubmit(async (data) => {

        try {
          await axios.post('/api/issues', data);
          router.push('/issues');
          
        } catch (error) {
          setError('An Unexpected Error in form')
        }

      })}>
      <input 
        type="text" 
        placeholder="Title" 
        className="w-full px-4 py-2 border rounded-md"
        {...register('title')}
      />
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>
      <Controller 
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
      />
      <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>

      <Button>Submit new issue</Button>
    </form>
    </div>
  );
}