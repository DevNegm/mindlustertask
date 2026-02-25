import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Column from "./components/column"
import Navbar from "./components/navbar"
import { getColumns, moveTask } from "./api/main";
import { getTotalTasks } from "./utils/helpers";
import { DragDropContext } from "@hello-pangea/dnd";
import PreLoader from "./components/PreLoader";
import { useMemo, useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["columns"],
    queryFn: getColumns,
  });



  const moveMutation = useMutation({
    mutationFn: ({ fromColumnId, toColumnId, taskId, fromIndex, toIndex }) => moveTask(fromColumnId, toColumnId, taskId, fromIndex, toIndex),
    onSuccess: () => queryClient.invalidateQueries(["columns"], { refetchType: 'background' })
  });

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return; // dropped outside

    const fromColumnId = source.droppableId;
    const toColumnId = destination.droppableId;
    const taskId = Number(draggableId);

    if (fromColumnId === toColumnId && source.index === destination.index)
      return;

    moveMutation.mutate({
      fromColumnId,
      toColumnId,
      taskId,
      fromIndex: source.index,
      toIndex: destination.index,
    });
  };

  const total = getTotalTasks(data);

  const filteredColumns = useMemo(() => {
    if (!search.trim()) return data;

    const term = search.toLowerCase();

    return data.map(column => ({
      ...column,
      tasks: column.tasks.filter(task =>
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term)
      )
    }));
  }, [data, search]);

  if (isLoading) return <PreLoader />;
  if (error) return <p className="text-center mt-20 text-muted">Error: {error.message}</p>;

  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <Navbar total={total} search={search} setSearch={setSearch} />
      <DragDropContext onDragEnd={onDragEnd}>
        <section className="flex gap-5 p-5 overflow-x-auto no-scrollbar">
          {filteredColumns?.map((column) => (
            <Column key={column?.id} column={column} />
          ))}
        </section>
      </DragDropContext>
    </main>
  )
}

export default App
