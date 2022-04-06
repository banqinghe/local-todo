export type CatalogItem = {
  title: string;
  createdTime: number;
  modifiedTime: number;
};
export type Catalog = CatalogItem[];

export type SidebarInfo = {
  todoInfoList: Catalog;
  todoRecycleList: Catalog;
};

export type TodoItem = { content: string; checked: boolean };
export type TodoList = TodoItem[];

export type TodoListStore = {
  title: string;
  createdTime: number;
  modifiedTime: number;
  todoList: TodoList;
};
