'use client';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, Callout } from "@radix-ui/themes";
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IssueForm {
  title: string,
  description: string
}

export default function NewIssuePage() {

  const router = useRouter();
  const {register,control,handleSubmit} = useForm<IssueForm>();
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
      <Controller 
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
      />
      <Button>Submit new issue</Button>
    </form>
    </div>
  );
}