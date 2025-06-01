'use client';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button } from "@radix-ui/themes";
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string,
  description: string
}

export default function NewIssuePage() {

  const router = useRouter();
  const {register,control,handleSubmit} = useForm<IssueForm>();

  return (
    <form 
      className="max-w-xl space-y-3" 
       onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/issues', data);
        router.push('/issues');
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
  );
}