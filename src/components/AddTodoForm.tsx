import React, { useState } from "react";

interface AddTodoFormProps {
    addTodo: (title: string, desc: string) => void;
}

/*
 * AddTodoForm: Create two input fields for title, and description string fields
 * As well as a submit button which creates the new To Do via addTodo 
 */
function AddTodoForm({ addTodo }: AddTodoFormProps) {
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
      /* Fixed bug by adding event.preventDefault() to prevent the default form submission behavior,
         which would otherwise reload the page and disrupt the form submission process. 
      */
        event.preventDefault();
        addTodo(title, desc);
        setTitle('');
        setDesc('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                  /* Bug 2: It need to bind the input field's value to the title variable to make sure consistency 
                    between UI and the underline state                   
                   */
                    value={title}
                    type="text"
                    placeholder="Provide a title for the new To Do"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={desc}
                    placeholder="Briefly describe the To Do task"
                    onChange={(e) => setDesc(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add To Do</button>
        </form>
    );
}

export default AddTodoForm;