import { v4 as uuidV4 } from "uuid";
import { PlusCircle } from "phosphor-react";
import emptyImg from "../assets/empty.svg"
import styles from "./Task.module.css";

import { ChangeEvent, FormEvent, useState } from "react";
import { TaskInfo } from "./TaskInfo"

interface Task {
    id: string;
    content: string;
    isCompleted: boolean;
}

export function Task() {

    const [ tasks, setTasks ] = useState<Task[]>([]);
    const [ newTaskText, setNewTaskText ] = useState('');


    function handleNewTask(event:ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity("")
        setNewTaskText(event.target.value);
    }

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();
        setTasks([...tasks, { content: newTaskText, isCompleted: false, id: uuidV4()}]);
        setNewTaskText('');
    }

    function deleteTask(id: string) {
        const tasksWithoutDeleteOne = tasks.filter( task => task.id !== id);

        setTasks(tasksWithoutDeleteOne);
    }

    function toggleTaskCompletion(id: string) {
        const tasksWithChangedSituation = tasks.map(task => task.id === id ? {...task, isCompleted: !task.isCompleted }: task);
        console.log(tasksWithChangedSituation);

        setTasks(tasksWithChangedSituation);
    }
    
    const tasksCompleted = tasks.reduce( (acc, task) => {
        if(task.isCompleted) {
            return acc + 1;
        }
        return acc;
    }, 0)

    const isComentEmpty = newTaskText.length === 0;
  
    return ( 
    <div  className={styles.container}>
        <form className={styles.newTask} onSubmit={handleCreateNewTask}>
            <input 
                placeholder="Adicione uma nova tarefa"
                onChange={handleNewTask}
                value={newTaskText}         
            />
            <button type="submit" disabled={isComentEmpty}>
                <strong>Criar</strong>
                <PlusCircle size={16} />
            </button>
        </form>

        <div className={styles.tasks}>
            <header className={styles.taskInfo}>
                <div className={styles.tasksTotal}>
                    <strong>Tarefas criadas</strong>
                    <span>{tasks.length}</span>
                </div>
                <div className={styles.tasksCompleted}>
                    <strong>Concluídas</strong>
                    <span>{tasksCompleted} de {tasks.length}</span>
                </div>
            </header>


            {tasks.length === 0 ?
                <div className={styles.taskEmpty}>
                        <img src={emptyImg} alt="img task Empty" />
                        <span className={styles.description} >
                            <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
                            <p>Crie tarefas e organize seus itens a fazer</p>
                        </span>
                </div>    
                :
                <div className={styles.taskList}>
                    {tasks.map( task => {
                        return <TaskInfo 
                        key={task.id}
                        id={task.id}
                        content={task.content}
                        isCompleted={task.isCompleted}
                        onDeleteTask={deleteTask}
                        onToggleTaskCompletion={toggleTaskCompletion}
                    />
                })}
                </div>
            }
        </div>
    </div>      
    )
}