import { useState, useEffect } from 'react';
import { IconEdit } from '@/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { getTodo, toggleTodo } from '@/utils';
import { IconBuild, IconLightBubble } from '@/icons';
import { Todo } from '@/types';
import useUpdateSidebar from '@/hooks/useUpdateSidebar';
import TodoListItem from './TodoListItem';

export default function TodoList() {
  const updateSidebar = useUpdateSidebar();

  const [todo, setTodo] = useState<Todo>({
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
    setTodo(prevTodo => {
      const prevList = prevTodo.todoList;
      return {
        ...prevTodo,
        modifiedTime: Date.now(),
        todoList: prevList.map((item, index) => {
          if (index === targetIndex) {
            return { ...item, checked: !item.checked };
          }
          return item;
        }),
      };
    });
    toggleTodo(id, targetIndex).then(() => updateSidebar());
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
    <div position="relative">
      <div
        position="absolute right-3 top-1"
        flex="~"
        justify="end"
        align="items-center"
        p="x-2 y-2"
      >
        <div title="edit" onClick={handleClickEdit}>
          <IconEdit className="text-2xl p-1 rounded cursor-pointer hover:bg-gray-100" />
        </div>
      </div>
      <div w="11/12 md:8/12" m="x-auto" p="y-5" space="y-3">
        <div m="b-6" p="x-2">
          <h1 m="b-3" text="2xl" font="bold">
            {todo.title}
          </h1>
          <div flex="~ col gap-2 lg:row lg:gap-4" text="xs gray-500">
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
          <TodoListItem
            key={index}
            content={content}
            checked={checked}
            index={index}
            onCheck={handleCheckboxClick}
          />
        ))}
      </div>
    </div>
  );
}
