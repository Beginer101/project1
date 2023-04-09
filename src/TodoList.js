import React, { useState, useEffect } from "react";

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        // Викликаємо функцію, яка завантажує таски з localStorage при монтажі компонента
        loadTasks();
    }, []);

    const handleAddTask = () => {
        // Перевіряємо, щоб інпут не був пустий або забитий пробілами/переносами рядку
        if (inputValue.trim().length === 0) return;

        // Створюємо нову таску та додаємо до списку тасків
        const newTask = {
            id: Date.now(),
            text: inputValue,
            completed: false
        };
        setTasks([...tasks, newTask]);

        // Очищаємо інпут
        setInputValue("");
    };

    const handleDeleteTask = (taskId) => {
        // Фільтруємо список тасків і видаляємо заданий taskId
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const handleToggleTask = (taskId) => {
        // Змінюємо властивість completed для заданого taskId
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? {...task, completed: !task.completed} : task
        );
        setTasks(updatedTasks);
    };

    const loadTasks = () => {
        // Отримуємо таски з localStorage та встановлюємо їх в стан компонента
        const tasksFromLocalStorage = JSON.parse(
            localStorage.getItem("tasks") || "[]"
        );
        setTasks(tasksFromLocalStorage);
    };

    useEffect(() => {
        // Зберігаємо таски у localStorage при зміні списку тасків
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") handleAddTask();
                }}
            />
            <button onClick={handleAddTask}>Add Task</button>
            <ul className='Task'>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleTask(task.id)}
                        />
                        <span style={{textDecoration: task.completed ? "line-through" : "none"}}>
              {task.text}
            </span>
                        <button className='Delete' onClick={() => handleDeleteTask(task.id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default TodoList;