import { get, set, update, delMany, getMany } from 'idb-keyval';
import { Catalog, TodoListStore } from '@/types';

const todoPrefix = 'TODO_';
const todoInfoListKey = 'TODO_INFO_LIST';

const todoRecycleListKey = 'TODO_RECYCLE_INFO_LIST';

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
 * Delete a todo, move todo info to recycle list
 */
export function deleteTodo(id: string) {
  // append to todo recycle list
  get(todoPrefix + id).then(todo => {
    const recycleTodoInfo = {
      title: todo.title,
      createdTime: todo.createdTime,
      modifiedTime: todo.modifiedTime,
    };
    update<Catalog>(todoRecycleListKey, prevInfoList => {
      if (!prevInfoList) {
        return [recycleTodoInfo];
      }
      const newInfoList =
        prevInfoList.length > 9
          ? [recycleTodoInfo, ...prevInfoList.slice(0, 9)]
          : [recycleTodoInfo, ...prevInfoList];
      delMany([
        prevInfoList
          .slice(9)
          .map(info => todoPrefix + info.createdTime.toString()),
      ]);
      return newInfoList;
    });
  });

  // delete info from todo info list
  update<Catalog>(todoInfoListKey, prevInfoList => {
    if (!prevInfoList) {
      return [];
    }
    return prevInfoList.filter(info => info.createdTime !== Number(id));
  });
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

/** Get recycle bin list */
export function getRecycleBinList() {
  return get<Catalog>(todoRecycleListKey);
}

/** Get both todo info list and recycle list */
export function getSidebarInfo() {
  return getMany<Catalog>([todoInfoListKey, todoRecycleListKey]);
}

/** Restore todo */
export function restoreTodo(id: string) {
  update<Catalog>(todoRecycleListKey, prevInfoList => {
    if (!prevInfoList) {
      return [];
    }
    return prevInfoList.filter(info => info.createdTime !== Number(id));
  });
  get<TodoListStore>(todoPrefix + id).then(todo => {
    if (!todo) {
      return;
    }
    const { createdTime, modifiedTime, title } = todo;
    updateCatalog(createdTime, modifiedTime, title, true);
  });
}
