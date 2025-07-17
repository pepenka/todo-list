import {Button, Card, Checkbox, Icon, Text} from "@gravity-ui/uikit";
import {type Task} from "./taskData.ts";
import {TrashBin} from '@gravity-ui/icons';
import styled from "styled-components";
import {saveTodoListToLocalStorage} from "../services/localStorage.ts";

const CustomCard = styled(Card)`
    max-width: 350px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: start;
    padding: 10px;
`;

const ControlPanel = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    margin-left: 10px;
`;

type Props = {
    task: Task;
    taskList: Task[];
    setTaskList: (tasks: Task[]) => void;
}

export function TaskItem({task, taskList, setTaskList}: Props) {
    const deleteHandler = () => {
        const newItems: Task[] = taskList.filter((t: Task) => {
            return t.id !== task.id;
        })

        saveTodoListToLocalStorage(newItems);
        setTaskList(newItems);
    }

    const changeCheckboxHandler = () => {
        const newTask: Task = {
            id: task.id,
            name: task.name,
            status: task.status === 'done' ? 'to do' : 'done'
        }

        const newItems: Task[] = taskList.map((t: Task) => {
            if (t.id === task.id) {
                return newTask;
            }
            return t;
        });

        saveTodoListToLocalStorage(newItems);
        setTaskList(newItems);
    }

    return (
        <CustomCard>
            <Text wordBreak={"break-all"}
                  variant={'body-3'}
                  style={
                      task.status === 'done'
                          ? {textDecoration: 'line-through'}
                          : {textDecoration: 'none'}
            }>
                {task.name}
            </Text>
            <ControlPanel>
                <Checkbox checked={task.status === 'done'}
                          onUpdate={() => changeCheckboxHandler()}/>

                <Button onClick={() => deleteHandler()}>
                    Удалить<Icon data={TrashBin}/>
                </Button>
            </ControlPanel>
        </CustomCard>
    )
}