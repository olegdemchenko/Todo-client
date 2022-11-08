import { Task } from "../../interfaces";

const initialState = {
  task: null,
  error: null,
};

type ACTIOTYPE =
  | {
      type: "TASKS/FETCHED";
      payload: Task;
    }
  | { type: "ERROR"; payload: Response };

type StateType = { task: Task | null; error: Error | null };
function reducer(state: StateType, action: ACTIOTYPE): StateType {
  switch (action.type) {
    case "TASKS/FETCHED":
      return { task: action.payload, error: null };
    case "ERROR":
      return {
        task: null,
        error: new Error(
          `Error with status ${action.payload.status}, ${action.payload.statusText}. Url ${action.payload.url}`
        ),
      };
    default:
      throw new Error(`reducer action type is not defined`);
  }
}

export { initialState, reducer };
