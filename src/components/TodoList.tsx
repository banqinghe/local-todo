import { useState, useEffect, useContext } from 'react';
import { IconCheckboxBlank, IconCheckboxChecked, IconEdit } from '@/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { CatalogContext } from '@/context';
import { getTodo, toggleTodo } from '@/utils';
import { IconBuild, IconLightBubble } from '@/icons';

import { TodoList as TodoListType, TodoListStore } from '@/types';

interface TodoListProps {}

export default function TodoList(props: TodoListProps) {
  const { updateCatalog } = useContext(CatalogContext);

  // const [todoList, setTodoList] = useState<TodoListType>([]);
  const [todo, setTodo] = useState<TodoListStore>({
    title: '',
    createdTime: 0,
    modifiedTime: 0,
    todoList: [],
  });

  const navigate = useNavigate();
  const id = useParams().id;

  if (!id) {
    return <div />;
  }

  const handleCheckboxClick = (targetIndex: number) => {
    // setTodoList(list =>
    //   list.map((item, index) => {
    //     if (index === targetIndex) {
    //       return { ...item, checked: !item.checked };
    //     }
    //     return item;
    //   })
    // );
    setTodo(prevTodo => {
      const prevList = prevTodo.todoList;
      return {
        ...prevTodo,
        todoList: prevList.map((item, index) => {
          if (index === targetIndex) {
            return { ...item, checked: !item.checked };
          }
          return item;
        }),
      };
    });
    toggleTodo(id, targetIndex);
    setTimeout(() => {
      updateCatalog();
    }, 100);
  };

  const handleClickEdit = () => {
    navigate('/modify/' + id);
  };

  useEffect(() => {
    (async () => {
      const todoListStore = await getTodo(id);
      if (todoListStore) {
        setTodo(todoListStore);
      }
    })();
  }, [id]);

  return (
    <div>
      <div flex="~" justify="end" align="items-center" p="x-6 y-2" border="b-1">
        <div title="edit" onClick={handleClickEdit}>
          <IconEdit className="text-2xl p-1 rounded cursor-pointer hover:bg-gray-100" />
        </div>
      </div>
      <div w="8/12" m="x-auto" p="y-6" space="y-3">
        <div m="b-6" p="x-2">
          <h1 m="b-3" text="2xl" font="bold">
            {todo.title}
          </h1>
          <div flex="~ gap-4" text="xs gray-500">
            <div flex="~ gap-1" align="items-center">
              <IconLightBubble className="text-xs" />
              Created at {new Date(todo.createdTime).toLocaleString()}
            </div>
            <div flex="~ gap-1" align="items-center">
              <IconBuild className="text-xs text-gray-400" />
              Updated at {new Date(todo.modifiedTime).toLocaleString()}
            </div>
          </div>
        </div>
        {todo.todoList.map(({ content, checked }, index) => (
          <div
            key={index}
            flex="~ gap-3"
            align="items-start"
            bg="hover:light-500"
            p="x-2"
            border="rounded"
            selection="bg-yellow-200"
          >
            <label
              text="2xl gray-500"
              flex="~"
              align="items-center"
              style={{ height: '1.75rem' }}
              cursor="pointer"
            >
              <input
                type="checkbox"
                display="hidden"
                onChange={() => handleCheckboxClick(index)}
              />
              {checked ? (
                <IconCheckboxChecked />
              ) : (
                <IconCheckboxBlank className="text-gray-300" />
              )}
            </label>
            <p
              font="leading-7"
              className={checked ? 'opacity-30 line-through' : ''}
            >
              {content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
