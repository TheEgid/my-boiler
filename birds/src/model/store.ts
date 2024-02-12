import { createStore, createEffect } from "effector";
import { apiRoot } from "src/api";

export const fetchTasks = createEffect(async () => {
    const response = await fetch("api/task");

    return response.json();
});

export const $tasks = createStore([]).on(fetchTasks.done, (_, { result }) => result);

export const addTaskFx = createEffect(async (params: { title: string }) => {
    const response = await apiRoot.post("task", { json: { title: params.title } });

    return response.json();
});

// export const updateTask = createEffect(async ({ id, title, completed }) => {
//     const response = await fetch(`/api/tasks/${id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ title, completed }),
//     });

//     return response.json();
// });

// export const deleteTask = createEffect(async (id: string) => {
//     const response = await fetch(`/api/tasks/${id}`, {
//         method: "DELETE",
//     });

//     return response.json();
// });
