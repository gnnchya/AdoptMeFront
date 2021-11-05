import { Todo } from "../entities/Todo"
import { TodoItem } from "./TodoItem"
import "./todoList.scss"

type Probs = {
    todos: Todo[]
}

export const TodoList: React.FC<Probs> = ({ todos }) =>{
    return(
        <ul className="todo-list">
            {
                todos.map((todo, i)=>(
                    <li key={i}>
                        <TodoItem 
                        title={todo.title} 
                        description={todo.description} 
                        isCompleted={todo.isCompleted}
                        />
                    </li>
                ))
            }
        </ul>
    )
}