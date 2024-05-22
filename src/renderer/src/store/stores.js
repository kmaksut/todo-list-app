import { writable } from "svelte/store";

export const todos = writable([]);
export const modalChoose = writable(false);
export const mainTodoActive = writable(true);
export const doneTodoActive = writable(false);
export const starsTodoActive = writable(false);
export const userInfo = writable([{id: 1, name: "Kasım", surname: "Maksutoğlu", profileIcon: '/src/assets/profile.png' ,description: "Active"}])

export function changeUserInfo(name,surname,description) {
    userInfo.update(value => value.filter(curr => curr.name == name))
    userInfo.update(value => value.filter(curr => curr.surname == surname))
    userInfo.update(value => value.filter(curr => curr.description == description))
}
export function removeItem(id) {
    return todos.update(value => value.filter(curr => curr.id != id))
}
export function addStar(id) {
    return todos.update(value => value.filter(curr => [...value, curr.id == id ? curr.isStar = !curr.isStar : false] ))        
}
export function doneTodo(id) {
    return todos.update(value => value.filter(curr => [...value, curr.id == id ? curr.isDone = !curr.isDone : false] ))         
}
export function todoListMain() {
    mainTodoActive.set(true);
    doneTodoActive.set(false);
    starsTodoActive.set(false);
}
export function doneTodoList() {
    doneTodoActive.set(true);
    mainTodoActive.set(false);
    starsTodoActive.set(false);
}
export function starsTodoList() {
    starsTodoActive.set(true);
    mainTodoActive.set(false);
    doneTodoActive.set(false);
}
export function nowDate() {
    const allday = new Date(Date.now())
    return allday.getDate()+" "+"Mayıs"+" "+allday.getFullYear()
} 