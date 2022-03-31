import { get, set, update } from 'idb-keyval';
import { Catalog, TodoListStore } from '@/types';

const todoPrefix = 'TODO_';
const todoInfoListKey = 'TODO_INFO_LIST';

function updateCatalog(
  createdTime: number,
  modifiedTime: number,
  title: string,
  isAdd: boolean
) {
  update<Catalog>(todoInfoListKey, prevInfoList => {
    if (prevInfoList === undefined) {
      return isAdd ? [{ createdTime, modifiedTime: createdTime, title }] : [];
    }
    if (isAdd) {
      return [
        { createdTime, modifiedTime: createdTime, title },
        ...prevInfoList,
      ];
    } else {
      return prevInfoList.map(info => {
        if (info.createdTime !== createdTime) {
          return info;
        }
        return { ...info, modifiedTime: modifiedTime };
      });
    }
  });
}

/**
 * Create and save a new todo
 */
export function saveTodo(
  createdTime: number,
  title: string,
  todoList: string[]
) {
  set(todoPrefix + createdTime, {
    title,
    todoList: todoList.map(content => ({ checked: false, content })),
    createdTime,
    modifiedTime: createdTime,
  });
  updateCatalog(createdTime, createdTime, title, true);
}

/**
 * Modify existing todo list
 */
export function modifyTodo(id: string, title: string, todoList: string[]) {
  const createdTime = Number(id);
  const modifiedTime = Date.now();
  update<TodoListStore>(todoPrefix + createdTime, prevStore => {
    if (prevStore === undefined) {
      return {
        title,
        todoList: [],
        createdTime,
        modifiedTime,
      };
    }

    const prevTodoContentList = prevStore.todoList.map(todo => todo.content);
    const newTodoList = todoList.map(content => {
      let checked = false;
      const prevIndex = prevTodoContentList.indexOf(content);
      if (prevIndex >= 0) {
        checked = prevStore.todoList[prevIndex].checked;
      }
      return {
        checked,
        content,
      };
    });
    const newTodo = {
      title,
      todoList: newTodoList,
      createdTime,
      modifiedTime,
    };
    return newTodo;
  });
  updateCatalog(createdTime, modifiedTime, title, false);
}

/**
 * Get todo list by id
 */
export function getTodo(id: string) {
  return get<TodoListStore>(todoPrefix + id);
}

/**
 * Toggle a todo item status
 */
export function toggleTodo(id: string, targetIndex: number) {
  let title = '';
  update<TodoListStore>(todoPrefix + id, prevStore => {
    if (prevStore === undefined) {
      return {
        title,
        todoList: [],
        createdTime: Number(id),
        modifiedTime: Number(id),
      };
    }
    title = prevStore.title;
    const newTodoList = prevStore.todoList.map((todo, index) => {
      if (index !== targetIndex) {
        return todo;
      }
      return {
        checked: !todo.checked,
        content: todo.content,
      };
    });

    return {
      ...prevStore,
      todoList: newTodoList,
    };
  }).then(() => {
    updateCatalog(Number(id), Date.now(), title, false);
  });
}

/**
 * Get catalog
 */
export function getCatalog() {
  return get<Catalog>(todoInfoListKey);
}
