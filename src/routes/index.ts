const origin = "http://localhost:5000";

export const routes = {
  tasks: () => origin,
  task: (taskId: string) => [origin, taskId].join("/"),
};
