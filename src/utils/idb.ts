import { get, set, update, delMany, getMany } from 'idb-keyval';
import { TodoBriefList, Todo } from '@/types';

const todoPrefix = 'TODO_';
const todoInfoListKey = 'TODO_INFO_LIST';

const todoRecycleListKey = 'TODO_RECYCLE_INFO_LIST';

function updateCatalog(
  createdTime: number,
  modifiedTime: number,
  title: string,
  isAdd: boolean
) {
  update<TodoBriefList>(todoInfoListKey, prevInfoList => {
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
  update<Todo>(todoPrefix + createdTime, prevStore => {
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
    update<TodoBriefList>(todoRecycleListKey, prevInfoList => {
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
  update<TodoBriefList>(todoInfoListKey, prevInfoList => {
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
  return get<Todo>(todoPrefix + id);
}

/**
 * Toggle a todo item status
 */
export function toggleTodo(id: string, targetIndex: number) {
  let title = '';
  update<Todo>(todoPrefix + id, prevStore => {
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
  return get<TodoBriefList>(todoInfoListKey);
}

/** Get recycle bin list */
export function getRecycleBinList() {
  return get<TodoBriefList>(todoRecycleListKey);
}

/** Get both todo info list and recycle list */
export async function getSidebarInfo() {
  const [todoInfoList, todoRecycleList] = await getMany<TodoBriefList>([
    todoInfoListKey,
    todoRecycleListKey,
  ]);
  return [todoInfoList ?? [], todoRecycleList ?? []];
}

/** Restore todo */
export function restoreTodo(id: string) {
  update<TodoBriefList>(todoRecycleListKey, prevInfoList => {
    if (!prevInfoList) {
      return [];
    }
    return prevInfoList.filter(info => info.createdTime !== Number(id));
  });
  get<Todo>(todoPrefix + id).then(todo => {
    if (!todo) {
      return;
    }
    const { createdTime, modifiedTime, title } = todo;
    updateCatalog(createdTime, modifiedTime, title, true);
  });
}
