import { useState, useContext } from 'react';
import { IconPlus, IconChecklist, IconDelete, IconRestore } from '@/icons';
import { Link, useLocation } from 'react-router-dom';
import { CatalogContext } from '@/context';
import { deleteTodo, restoreTodo } from '@/utils';
import cn from 'classnames';
import { CatalogItem } from '@/types';

// const fakeData: Catalog = Array.from({ length: 20 }, (_, index) => {
//   return {
//     title: 'title ' + index,
//     createdTime: index + Date.now(),
//     modifiedTime: index + Date.now(),
//   };
// });

interface TodoInfoListItemProps {
  info: CatalogItem;
  activeKey: string;
  handleDelete: (id: string) => void;
}

function TodoInfoListItem(props: TodoInfoListItemProps) {
  const { info, activeKey, handleDelete } = props;
  return (
    <li
      key={info.createdTime}
      position="relative"
      flex="~"
      align="items-center"
      w="full"
      bg="hover:light-300"
      cursor="pointer"
      className={cn('group', {
        'bg-light-300 border-r-2': activeKey === info.createdTime.toString(),
      })}
      title={info.title}
    >
      <Link
        className="w-full px-6 py-2 no-underline"
        to={info.createdTime + ''}
      >
        <div text="sm gray-700 truncate" m="b-1">
          {info.title}
        </div>
        <div text="gray-500 xs">
          {new Date(info.modifiedTime).toLocaleString()}
        </div>
      </Link>
      <div
        position="absolute right-2"
        text="gray-400 hover:gray-600"
        title="delete"
        display="hidden"
        group-hover="block"
        onClick={() => handleDelete(info.createdTime.toString())}
      >
        <IconDelete />
      </div>
    </li>
  );
}

interface TodoRecycleListItemProps {
  info: CatalogItem;
  handleRestore: (id: string) => void;
}

function TodoRecycleListItem(props: TodoRecycleListItemProps) {
  const { info, handleRestore } = props;
  return (
    <li
      key={info.createdTime}
      position="relative"
      flex="~"
      align="items-center"
      w="full"
      p="x-6 y-2"
      bg="hover:light-300"
      cursor="pointer"
      title={info.title}
      className="group"
    >
      <div>
        <div text="sm gray-700 truncate" m="b-1">
          {info.title}
        </div>
        <div text="gray-500 xs">
          {new Date(info.modifiedTime).toLocaleString()}
        </div>
      </div>
      <div
        position="absolute right-2"
        text="gray-400 hover:gray-600"
        title="restore"
        display="hidden"
        group-hover="block"
        onClick={() => handleRestore(info.createdTime.toString())}
      >
        <IconRestore />
      </div>
    </li>
  );
}

interface SidebarProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Sidebar(props: SidebarProps) {
  const { className, style } = props;

  const { sidebarInfo, updateCatalog } = useContext(CatalogContext);

  const [activeKey, setActiveKey] = useState<string>('');
  const [showType, setShowType] = useState<'todo' | 'recycle'>('todo');

  const location = useLocation();

  if (location.pathname.slice(1) !== activeKey) {
    setActiveKey(location.pathname.slice(1));
  }

  const handleDelete = (id: string) => {
    deleteTodo(id);
    setTimeout(() => {
      updateCatalog();
    }, 100);
  };

  const handleRestore = (id: string) => {
    restoreTodo(id);
    setTimeout(() => {
      updateCatalog();
    }, 100);
  };

  const handleToggleShowType = () => {
    setShowType(currentType => (currentType === 'todo' ? 'recycle' : 'todo'));
  };

  return (
    <aside
      flex="~ col"
      border="r-1 dark:gray-700"
      className={className}
      style={style}
    >
      <div flex="~" justify="between" p="x-3 y-2" border="b-1">
        <div title="toggle">
          <IconChecklist
            className="text-2xl text-gray-600 cursor-pointer"
            onClick={handleToggleShowType}
          />
        </div>
        <Link to="new" title="new">
          <IconPlus className="text-2xl text-gray-600 rounded-1/2 cursor-pointer hover:bg-gray-100" />
        </Link>
      </div>
      {showType === 'recycle' && (
        <div
          flex="~ gap-2"
          justify="center"
          align="items-center"
          p="y-4"
          bg="light-500"
          text="center sm gray-500"
          font="bold"
        >
          <IconDelete className="text-xl" />
          <span>Recycle Bin</span>
        </div>
      )}
      <ul overflow="auto" className="thin-scrollbar">
        {showType === 'todo'
          ? sidebarInfo.todoInfoList?.map(item => (
              <TodoInfoListItem
                key={item.createdTime}
                info={item}
                activeKey={activeKey}
                handleDelete={handleDelete}
              />
            ))
          : sidebarInfo.todoRecycleList?.map(item => (
              <TodoRecycleListItem
                key={item.createdTime}
                info={item}
                handleRestore={handleRestore}
              />
            ))}
      </ul>
    </aside>
  );
}
