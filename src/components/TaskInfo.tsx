import styles from "./TaskInfo.module.css"
import { FaCheckCircle } from 'react-icons/fa';
import { BiCircle } from "react-icons/bi";
import { Trash } from "phosphor-react";

interface TaskProps {
    id: string;
    content: string;
    isCompleted: boolean;
    onDeleteTask: (id: string) => void;
    onToggleTaskCompletion: (id: string) => void;
}

export function TaskInfo({ id, content, isCompleted, onDeleteTask, onToggleTaskCompletion }:TaskProps) {

    function handleDeleteTask() {
        onDeleteTask(id);
    }

    function handleToggleTaskCompletion() {
        onToggleTaskCompletion(id);
    }

    return (
        <div className={styles.task}>
            {isCompleted ?             
         
            <>
                <FaCheckCircle 
                    size={18} 
                    className={styles.checkCircleIcon} 
                    onClick={ handleToggleTaskCompletion}
                />
                <p className={styles.taskCompleted}>{content}</p>
            </>
            :
            <>
                <BiCircle
                    size={22} 
                    className={styles.circleIcon} 
                    onClick={ handleToggleTaskCompletion}
                />
                <p className={styles.taskNotCompleted}>{content}</p>
            </>
        }
            <Trash 
                size={24}
                className={styles.trash} 
                onClick={handleDeleteTask}
            />
        </div>
        
    )
}