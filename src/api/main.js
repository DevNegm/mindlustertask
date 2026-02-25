import axios from "axios";

const LOCAL_BASE_URL = "http://localhost:4000/columns";
const BASE_URL = "https://mindlusterapi.onrender.com";

export const getColumns = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createTask = async (columnId, newTask) => {
  const columnRes = await axios.get(`${BASE_URL}/${columnId}`);
  const column = columnRes.data;

  const updatedTasks = [
    ...column.tasks,
    {
      ...newTask,
      id: Date.now(),
      column: columnId,
    },
  ];

  const res = await axios.patch(`${BASE_URL}/${columnId}`, {
    tasks: updatedTasks,
  });
  return res.data;
};

export const updateTask = async (
  columnId,
  updatedTask
) => {
  const columnRes = await axios.get(`${BASE_URL}/${columnId}`);
  const column = columnRes.data;

  const updatedTasks = column.tasks.map((task) =>
    task.id === updatedTask?.id ? { ...task, ...updatedTask } : task
  );

  const res = await axios.patch(`${BASE_URL}/${columnId}`, {
    tasks: updatedTasks,
  });

  return res.data;
};

export const deleteTask = async (
  columnId,
  taskId
) => {
  const columnRes = await axios.get(`${BASE_URL}/${columnId}`);
  const column = columnRes.data;

  const updatedTasks = column.tasks.filter(
    (task) => task.id !== taskId
  );

  const res = await axios.patch(`${BASE_URL}/${columnId}`, {
    tasks: updatedTasks,
  });

  return res.data;
};

export const moveTask = async (
  fromColumnId,
  toColumnId,
  taskId,
  fromIndex,
  toIndex
) => {
  const [{ data: fromColumn }, { data: toColumn }] = await Promise.all([
    axios.get(`${BASE_URL}/${fromColumnId}`),
    axios.get(`${BASE_URL}/${toColumnId}`),
  ]);

  const task = fromColumn.tasks.find((t) => t.id === taskId);
  if (!task) throw new Error("Task not found");

  const updatedFromTasks = fromColumn.tasks.filter((t) => t.id !== taskId);

  let updatedToTasks = [...toColumn.tasks];

  if (fromColumnId === toColumnId) {
    updatedToTasks.splice(fromIndex, 1);
    updatedToTasks.splice(toIndex, 0, task);
  } else {
    updatedToTasks.splice(toIndex, 0, { ...task, column: toColumnId });
  }

  await Promise.all([
    axios.patch(`${BASE_URL}/${fromColumnId}`, { tasks: updatedFromTasks }),
    axios.patch(`${BASE_URL}/${toColumnId}`, { tasks: updatedToTasks }),
  ]);

  return true;
};