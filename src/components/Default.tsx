import { useState, useEffect } from 'react';
import { IconPlus, IconRightArrow } from '@/icons';
import TodoListItem from './TodoListItem';
import { TodoList } from '@/types';

export default function Default() {
  const [todoList, setTodoList] = useState<TodoList>([]);

  useEffect(() => {
    setTodoList([
      { content: 'Have Lunch', checked: true },
      { content: 'Learn TypeScript', checked: false },
      { content: 'Go to the zoo', checked: false },
    ]);
  }, []);

  const handleCheckboxClick = (targetIndex: number) => {
    setTodoList(prevList => {
      return prevList.map((item, index) => {
        return {
          ...item,
          checked: index === targetIndex ? !item.checked : item.checked,
        };
      });
    });
  };

  return (
    <div position="relative" h="full">
      <div
        display="hidden sm:inline-flex"
        align="items-center"
        gap="1"
        p="x-3 y-1"
        transform="~ translate-x-5 translate-y-2"
        border="rounded-lg"
        bg="hover:light-400"
        transition="all duration-500"
      >
        👈 Click <IconPlus className="text-2xl" /> to add a new todo.
      </div>
      <div
        position="relative top-3/12"
        flex="~ col sm:row"
        p="x-8 sm:0"
        justify="center"
        align="items-stretch"
        gap="4 sm:16"
      >
        <ul
          flex="~ col"
          justify="center"
          p="x-8 y-6"
          space="y-4"
          border="rounded"
          shadow="~ hover:md"
          transition="all duration-300"
        >
          <li># Today Todo</li>
          <li>- Have Lunch</li>
          <li>- Learn TypeScript</li>
          <li>- Go to the zoo</li>
        </ul>
        <IconRightArrow
          style={{ fontSize: 40 }}
          className="text-light-800 self-center transform rotate-90 sm:transform-none transition-transform"
        />
        <div
          p="x-8 y-6"
          border="rounded"
          shadow="~ hover:md"
          transition="all duration-300"
        >
          <h2 m="b-4" p="x-2" text="lg" font="bold">
            Today Todo
          </h2>
          <ul space="y-2">
            {todoList.map((item, index) => (
              <TodoListItem
                key={index}
                content={item.content}
                checked={item.checked}
                onCheck={handleCheckboxClick}
                index={index}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
