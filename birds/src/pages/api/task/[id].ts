import { createEvent, createStore, createEffect } from "effector";

export const getUsers = createEffect(async () => {
    // Здесь вызывайте функции Prisma для чтения данных
    // Например, const users = await prisma.user.findMany();
    // Возвращайте полученные данные
});

export const addUser = createEvent();
export const updateUser = createEvent();
export const deleteUser = createEvent();

export const users = createStore([])
    .on(getUsers.done, (_, { result }) => result)
    .on(addUser, (state, newUser) => [...state, newUser])
    .on(updateUser, (state, updatedUser) => state.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    .on(deleteUser, (state, deletedUserId) => state.filter((user) => user.id !== deletedUserId));
