import type {Task} from "../components/taskData.ts";

const todoData = 'todoData';

export const getTodoItemsFromLocalStorage = () => {
    const data = localStorage.getItem(todoData);
    if(data && data.length > 0) {
        return JSON.parse(data);
    }
    return [];
}

export const saveTodoListToLocalStorage = (items: Task[]) => {
    localStorage.setItem(todoData, JSON.stringify(items));
}

export const increaseId = () => {
    const currentId = localStorage.getItem('lastId');
    if(!currentId) {
        localStorage.setItem('lastId', '1');
        return;
    }
    const newId = parseInt(currentId) + 1;
    localStorage.setItem('lastId', newId.toString());
}

export const getLastId = () => {
    const id = localStorage.getItem('lastId');
    if(!id) {
        localStorage.setItem('lastId', '0');
        return 0;
    }
    return parseInt(id);
}