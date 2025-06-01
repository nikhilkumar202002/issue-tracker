'use client';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { Button } from "@radix-ui/themes";


export default function NewIssuePage() {
  return (
    <div className="max-w-xl space-y-3">
      <input 
        type="text" 
        placeholder="Title" 
        className="w-full px-4 py-2 border rounded-md"
      />
      <SimpleMDE  placeholder="Description" />
      <Button>Submit new issue</Button>
    </div>
  );
}