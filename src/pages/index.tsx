import Head from "next/head";
import React, { useCallback, useState } from "react";
import { Todo } from "@/types/todo";
import AddTodoForm from "@/components/AddTodoForm"
import TodoList from "@/components/TodoList";
import Banner from "@/components/Banner";
import sampleData from "@/sampleData.json";

/*
 * Home: renders the To Do list page. Which is essentially a form component for creating To Dos and 3 todo lists
 * Each TodoList renders TodoItem components for each todo passed in
 * The 3 lists are for urgent, non-urgent, and completed
 * 
 * There are also several utility functions
 * 
 * AddTodo - create a new To Do
 * deleteTodo - delete a To Do via supplied id
 * toggleProperty - toggles isCompleted or isUrgent for supplied id
 * displayTodoList - renders the TodoList component
 * displayTodos - calls displayTodoList with a filtered To Do selection
 * displayComplete - calls displayTodoList with a filtered To Do selection
 */
export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(sampleData);

  const AddTodo = (title: string, desc: string) => {
    const newTodo: Todo = {
      id: todos.length + 1,
      title: title,
      description: desc,
      isCompleted: false,
      isUrgent: false,
    };

    /* Bug 5: The push method mutates the array directly, preventing React from detecting changes and triggering re-render.
       To fix this, create a new array by spreading the old array and adding the new item. */

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    /* Bug 3: Corrected logic to remove the specified todo by filtering out the matching id */
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleProperty = useCallback((id: number, property: keyof Pick<Todo, 'isCompleted' | 'isUrgent'>) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
      /* Bug 6: Fixed state mutation issue by returning a new object instead of modifying the original todo.
        This ensures React detects the change and properly re-renders the component. */
        return { ...todo, [property]: !todo[property] as boolean };
      }
      return todo;
    });

    setTodos(updatedTodos);      
  }, [todos]); // `todos` should be in the dependencies, `setTodos` is not needed

  const displayTodoList = (todoList:Todo[]) => {
    return (
      <TodoList
        todos={todoList}
        deleteTodo={deleteTodo} 
        toggleComplete={(id) => toggleProperty(id, 'isCompleted')} 
        toggleUrgent={(id) => toggleProperty(id, 'isUrgent')} 
      />
    );
  };

  const displayTodos = (displayUrgent: boolean) => {
    return displayTodoList(todos.filter((x) => {
      /* Bug 4: Fix filtering logic to correctly handle both urgent and non-urgent todos */
      return !x.isCompleted && x.isUrgent === displayUrgent;      
    }));
  };

  const displayComplete = () => {
    return displayTodoList(todos.filter((x) => x.isCompleted));
  };

  return (
    <>
      <Head>
        <title>To Do List</title>
        <meta name="description" content="To Do List App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="Home">
        <Banner />
        <AddTodoForm addTodo={AddTodo}/>
        {displayTodos(true)}
        {displayTodos(false)}
        {displayComplete()}
      </div>
    </>
  );
}
