import { createStore, createEffect } from "effector";

export const fetchTasks = createEffect(async () => {
    const response = await fetch("/api/tasks");

    return response.json();
});

export const $tasks = createStore([]).on(fetchTasks.done, (_, { result }) => result);

// eslint-disable-next-line @typescript-eslint/require-await
export const addTask = createEffect(async (title: string) => {
    console.log(title);
    // const response = await fetch("/api/tasks", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ title, completed: false }),
    // });

    // return response.json();
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
