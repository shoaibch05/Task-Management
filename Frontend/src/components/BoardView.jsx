import { useState } from "react";
import TaskModal from "./SmallComponents/TaskModel";
import ColumnModal from "./SmallComponents/ColumnModel";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./SmallComponents/TaskCard";

const initialData = [
  [
    "Development",
    2,
    {
      id: 1,
      title: "To Do",
      tasks: [
        { id: 101, title: "Create Login UI", priority: "High" },
        { id: 102, title: "Set up database", priority: "Medium" },
      ],
    },
    {
      id: 2,
      title: "In Progress",
      tasks: [{ id: 201, title: "Design Dashboard", priority: "High" }],
    },
    {
      id: 3,
      title: "Done",
      tasks: [{ id: 301, title: "Install Tailwind", priority: "Low" }],
    },
  ],
  [
    "Marketing",
    1,
    {
      id: 1,
      title: "To Do",
      tasks: [
        { id: 101, title: "Design Campaign", priority: "High" },
        { id: 102, title: "Email Draft", priority: "Medium" },
      ],
    },
    {
      id: 2,
      title: "In Progress",
      tasks: [{ id: 201, title: "Social Media Plan", priority: "High" }],
    },
    {
      id: 3,
      title: "Done",
      tasks: [{ id: 301, title: "Market Analysis", priority: "Low" }],
    },
  ],
  [
    "Planning",
    3,
    {
      id: 1,
      title: "To Do",
      tasks: [
        { id: 101, title: "Define Milestones", priority: "High" },
        { id: 102, title: "Set Timeline", priority: "Medium" },
      ],
    },
    {
      id: 2,
      title: "In Progress",
      tasks: [{ id: 201, title: "Draft Proposal", priority: "High" }],
    },
    {
      id: 3,
      title: "Done",
      tasks: [{ id: 301, title: "Get Approval", priority: "Low" }],
    },
  ],
];

export const BoardView = ({ boardId }) => {
  const matchedBoard = initialData.find((board) => board[1] === boardId);

  if (!matchedBoard) return <h2 className="text-white p-4">Board not found</h2>;

  const [title, , ...initialColumns] = matchedBoard;

  const [columns, setColumns] = useState(initialColumns);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddColumn = (title) => {
    const newCol = {
      id: Date.now(),
      title,
      tasks: [],
    };
    setColumns([...columns, newCol]);
  };

  const handleAddTask = (columnId, task) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, task] } : col
      )
    );
  };

  const handleEditTask = (columnId, updatedTask) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((t) =>
                t.id === updatedTask.id ? updatedTask : t
              ),
            }
          : col
      )
    );
  };

  const handleDeleteTask = (columnId, taskId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
          : col
      )
    );
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const srcColIndex = columns.findIndex(
      (col) => col.id.toString() === source.droppableId
    );
    const destColIndex = columns.findIndex(
      (col) => col.id.toString() === destination.droppableId
    );

    const sourceCol = columns[srcColIndex];
    const destCol = columns[destColIndex];
    const [movedTask] = sourceCol.tasks.splice(source.index, 1);

    if (sourceCol === destCol) {
      sourceCol.tasks.splice(destination.index, 0, movedTask);
    } else {
      destCol.tasks.splice(destination.index, 0, movedTask);
    }

    const newCols = [...columns];
    newCols[srcColIndex] = { ...sourceCol };
    newCols[destColIndex] = { ...destCol };

    setColumns(newCols);
  };

  return (
    <>
      <h1 className="text-xl font-bold text-white mb-6">{title} Board</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="p-6 overflow-x-auto flex flex-wrap gap-4">
          {columns.map((col) => (
            <Droppable droppableId={col.id.toString()} key={col.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-w-[16rem] bg-gray-100 dark:bg-gray-700 p-4 rounded shadow"
                >
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                    {col.title}
                  </h3>

                  <div className="space-y-2">
                    {col.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              onClick={() => {
                                setSelectedColumn(col.id);
                                setSelectedTask(task);
                                setShowTaskModal(true);
                              }}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedColumn(col.id);
                      setSelectedTask(null);
                      setShowTaskModal(true);
                    }}
                    className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    + Add Task
                  </button>
                </div>
              )}
            </Droppable>
          ))}

          <button
            className="min-w-[16rem] h-fit self-start text-blue-500 font-semibold mt-4"
            onClick={() => setShowColumnModal(true)}
          >
            + Add Column
          </button>
        </div>
      </DragDropContext>

      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        initialTask={selectedTask}
        onSave={(taskData) => {
          selectedTask
            ? handleEditTask(selectedColumn, taskData)
            : handleAddTask(selectedColumn, taskData);
          setShowTaskModal(false);
        }}
        onDelete={(taskId) => {
          handleDeleteTask(selectedColumn, taskId);
          setShowTaskModal(false);
        }}
      />

      <ColumnModal
        isOpen={showColumnModal}
        onClose={() => setShowColumnModal(false)}
        onSave={(title) => {
          handleAddColumn(title);
          setShowColumnModal(false);
        }}
      />
    </>
  );
};
