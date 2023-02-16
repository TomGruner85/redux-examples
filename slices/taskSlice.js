import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const populateTasksReducer = (state, action) => {
  const tasks = action.payload;
  const vehicleIndex = state.tasks.findIndex(
    (element) => element.vehicleId === tasks.vehicleId
  );
  if (vehicleIndex === -1) {
    state.tasks.push(tasks);
  } else {
    state.tasks[vehicleIndex] = {
      ...tasks,
    };
  }
};

const editTaskReducer = (state, action) => {
  const newTask = action.payload;
  const vehicleIndex = state.tasks.findIndex(
    (element) => element.vehicleId === newTask.vehicleId
  );
  if (vehicleIndex === -1) {
    return;
  } else {
    const taskIndex = state.tasks[vehicleIndex].tasks.findIndex(
      (element) => element._id.toString() === newTask.task._id.toString()
    );
    if (taskIndex === -1) {
      state.tasks[vehicleIndex].tasks.push(newTask.task);
    } else {
      if (newTask.task.lastCompleted) {
        newTask.task.lastCompleted = state.tasks[vehicleIndex].tasks[
          taskIndex
        ].lastCompleted.concat([newTask.task.lastCompleted]);
        if(newTask.task.lastCompleted.length >= 5){
          newTask.task.lastCompleted.splice(0, newTask.task.lastCompleted.length - 5)
        }
      } else {
        newTask.task.lastCompleted =
          state.tasks[vehicleIndex].tasks[taskIndex].lastCompleted.concat();
      }

      state.tasks[vehicleIndex].tasks[taskIndex] = {
        ...newTask.task,
      };
    }
  }
};

const bulkUpdateLastCompletedReducer = (state, action) => {
  const tasks = action.payload;
  tasks.forEach((task) => {
    const vehicleId = task.bike || task._id;
    const vehicleIndex = state.tasks.findIndex(
      (element) => element.vehicleId === vehicleId
    );
    if (vehicleIndex === -1) {
      return;
    } else {
      const taskIndex = state.tasks[vehicleIndex].tasks.findIndex(
        (element) => element._id.toString() === task._id.toString()
      );
      if (taskIndex === -1) {
        return;
      } else {
        if(state.tasks[vehicleIndex].tasks[taskIndex].lastCompleted.length >= 5){
          state.tasks[vehicleIndex].tasks[taskIndex].lastCompleted.splice(0, state.tasks[vehicleIndex].tasks[taskIndex].lastCompleted.length - 4)
        }
        task.lastCompleted = state.tasks[vehicleIndex].tasks[
          taskIndex
        ].lastCompleted.concat([...task.lastCompleted]);
        state.tasks[vehicleIndex].tasks[taskIndex] = {
          ...task,
        };
      }
    }
  });
};

const removeTaskReducer = (state, action) => {
  const task = action.payload;
  const vehicleIndex = state.tasks.findIndex(
    (element) => element.vehicleId === task.vehicleId
  );
  state.tasks[vehicleIndex].tasks = state.tasks[vehicleIndex].tasks.filter(
    (element) => element._id !== task.task._id
  );
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    populateTasks: populateTasksReducer,
    editTask: editTaskReducer,
    removeTask: removeTaskReducer,
    bulkUpdateLastCompleted: bulkUpdateLastCompletedReducer,
  },
});

export const { populateTasks, editTask, removeTask, bulkUpdateLastCompleted } =
  taskSlice.actions;

export const getAllTasksByVehicleId = (state, vehicleId) =>
  state.task.tasks.find((element) => element.vehicleId === vehicleId);

export default taskSlice.reducer;
