import React from "react";
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
    todos: Todo[];
    deleteTodo: (id: number) => void;
    toggleComplete: (id: number) => void;
    toggleUrgent: (id: number) => void;
}

/*
 * TodoList: Create a ul element and render a TodoItem element for each todo supplied
 */
function TodoList({ todos, deleteTodo, toggleComplete, toggleUrgent }: TodoListProps) {
    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem
                    /* Bug 1: It needs to give each array item a key to help React know what exacly has happened
                    and make correct update the DOM tree */ 
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    toggleComplete={toggleComplete}
                    toggleUrgent={toggleUrgent}
                />
            ))}
        </ul>
    );
}

export default TodoList;