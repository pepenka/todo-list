import styled from "styled-components";
import {Button, Card, Select, TextInput} from "@gravity-ui/uikit";
import {useState} from "react";
import {statuses, type Task} from "./taskData.ts";
import {TaskItem} from "./TaskItem.tsx";
import {getLastId, getTodoItemsFromLocalStorage, increaseId, saveTodoListToLocalStorage} from "../services/localStorage.ts";

const TasksContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
`;

const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    width: 100%;
`;

const TasksContentContainer = styled(Card)`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 350px;
    max-width: 350px;
    padding: 15px;
    margin-top: 10px;
`;

export function TaskList() {
    const [taskList, setTaskList] = useState<Task[]>(getTodoItemsFromLocalStorage());
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [taskName, setTaskName] = useState<string>('');

    const filteredTasks: Task[] = taskList.filter((task: Task) => {
        return !(selectedStatuses.length > 0 && !selectedStatuses.includes(task.status));
    });

    const createTaskHandler = () => {
        const newTask: Task = {
            id: getLastId(),
            name: taskName,
            status: 'to do'
        }

        const newItems: Task[] = [
            newTask,
            ...taskList
        ];

        saveTodoListToLocalStorage(newItems);
        increaseId();
        setTaskList(newItems);
    }

    return (
        <TasksContentContainer>
            <FilterContainer>
                <label>Фильтры:</label>
                <Select value={selectedStatuses}
                        label={'Статус:'}
                        options={statuses}
                        width={'max'}
                        multiple={true}
                        hasClear={true}
                        onUpdate={(e) => setSelectedStatuses(e)}/>
            </FilterContainer>

            <TextInput label={'Добавить задачу:'}
                       placeholder={'Название...'}
                       value={taskName}
                       onUpdate={(e) => setTaskName(e)}/>
            <Button onClick={createTaskHandler}>Добавить</Button>

            <TasksContainer>
                {filteredTasks.map((task: Task) => (
                    <TaskItem key={task.id}
                              task={task}
                              setTaskList={setTaskList}
                              taskList={taskList}/>
                ))}
            </TasksContainer>
        </TasksContentContainer>
    )
}