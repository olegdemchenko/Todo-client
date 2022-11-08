const origin = "http://localhost:5000";

export const routes = {
  tasks: () => [origin, "tasks"].join("/"),
  task: (taskId: string) => [origin, "tasks", taskId].join("/"),
};
