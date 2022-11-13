import { Task } from "../../interfaces";

const initialState = {
  tasks: [],
  error: null,
};

type ACTIONTYPE =
  | {
      type: "TASKS/ALLFETCHED";
      payload: Task[];
    }
  | {
      type: "TASKS/DELETED";
      payload: string;
    }
  | {
      type: "TASKS/ADDED";
      payload: Task;
    }
  | {
      type: "TASKS/STATUSCHANGED";
      payload: Task;
    }
  | {
      type: "ERROR";
      payload: Response;
    };

function reducer(
  state: { tasks: Task[]; error: null | Error },
  action: ACTIONTYPE
) {
  switch (action.type) {
    case "TASKS/ALLFETCHED":
      return { tasks: action.payload, error: null };
    case "TASKS/ADDED": {
      return { tasks: [...state.tasks, action.payload], error: null };
    }
    case "TASKS/STATUSCHANGED": {
      return {
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
        error: null,
      };
    }
    case "ERROR":
      return {
        tasks: state.tasks,
        error: new Error(
          `Error with status ${action.payload.status}, ${action.payload.statusText}. Url ${action.payload.url}`
        ),
      };
    default:
      throw new Error(`reducer action type is not defined`);
  }
}

export { initialState, reducer };
