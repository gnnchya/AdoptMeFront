import React from "react";
import { Todo } from "../entities/Todo"

export const TodoItem: React.FC<Todo> = ({title, description, isCompleted}) =>{
    return(
        <article className="todo-item">
            <h3>{title}</h3>
            <p>{description}</p>
            <input type="checkbox" defaultChecked={isCompleted}/>
        </article>
    )
}