export type TodoBrief = {
  title: string;
  createdTime: number;
  modifiedTime: number;
};
export type TodoBriefList = TodoBrief[];

export type SidebarInfo = {
  todoInfoList: TodoBriefList;
  todoRecycleList: TodoBriefList;
};

export type TodoItem = { content: string; checked: boolean };
export type TodoList = TodoItem[];

export type Todo = {
  todoList: TodoList;
} & TodoBrief;
