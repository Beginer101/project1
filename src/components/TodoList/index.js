import { useState, useEffect } from "react";

const TaskInput = ({ inputValue, onInputChange, onInputKeyDown, onAddTaskClick }) => {
    return (
        <div>
            <input type="text" value={inputValue} onChange={onInputChange} onKeyDown={onInputKeyDown} />
            <button onClick={onAddTaskClick}>Add Task</button>
        </div>
    );
};

const TaskList = ({ tasks, onDeleteTaskClick, onToggleTaskClick }) => {
    return (
        <ol className="list">
            {tasks.map((task) => (
                <li key={task.id}>
                    <input type="checkbox" checked={task.completed} onChange={() => onToggleTaskClick(task.id)} />
                    <span className={task.completed ? "completed-task" : ""}>{task.text}</span>
                    <button className="delete" onClick={() => onDeleteTaskClick(task.id)}>
                        X
                    </button>
                </li>
            ))}
        </ol>
    );
};

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            loadTasks();
        }
    }, []);

    const AddTask_ = () => {
        if (inputValue.trim().length === 0) return;
        setTasks((prevTasks) => [...prevTasks, { id: Date.now(), text: inputValue, completed: false }]);
        setInputValue("");
    };

    const DeleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const ToggleTask = (taskId) => {
        const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task));
        setTasks(updatedTasks);
    };

    const onChange = (event) => {
        setInputValue(event.target.value);
    };

    const AddTask = (event) => {
        if (event.key === "Enter") {
            AddTask_();
        }
    };

    const loadTasks = () => {
        const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks") || "[]");
        setTasks(tasksFromLocalStorage);
    };

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div>
            <TaskInput inputValue={inputValue} onInputChange={onChange} onInputKeyDown={AddTask} onAddTaskClick={AddTask_}/>
            <TaskList tasks={tasks} onDeleteTaskClick={DeleteTask} onToggleTaskClick={ToggleTask} />
        </div>
    );
};

export default TodoList;