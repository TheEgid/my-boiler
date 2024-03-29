import React, { useEffect } from "react";
import { useUnit } from "effector-react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import MapComponent from "src/mapOl";
import { $tasks, addTaskFx, fetchTasks } from "src/model/store";

export default function Home(): JSX.Element {
    const tasks = useUnit($tasks);

    useEffect(() => {
        void fetchTasks();
    }, []);

    const handleAddTask = async (title: string): Promise<void> => {
        await addTaskFx({ title });
        void fetchTasks();
    };

    // const handleUpdateTask = async (task: { id: number; title: string; completed: boolean }) => {
    //     await updateTask(task);
    //     void fetchTasks();
    // };

    // const handleDeleteTask = async (id: string) => {
    //     await deleteTask(id);
    //     void fetchTasks();
    // };

    return (
        <>
            <ToastContainer />
            <Head>
                <title>Приложение</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <div className="hello">
                    <div className="chil">Привет от птиц</div>
                </div>
                <MapComponent startCoordinates={[37.5673, 55.649]} />
                <div>
                    <h1>Task List</h1>
                    <ul>
                        {tasks.map((task) => (
                            <li key={task.id}>
                                {task.title} - Completed: {task.completed ? "Yes" : "No"}
                                {/* <button onClick={() => handleUpdateTask({ ...task, completed: !task.completed })}>Toggle Completed</button>
                                <button onClick={() => handleDeleteTask(task.id)}>Delete</button> */}
                            </li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        placeholder="New Task"
                        onKeyDown={async (e) => e.key === "Enter" && handleAddTask(e.currentTarget.value)}
                    />
                </div>
            </Container>
        </>
    );
}
