import { useContext } from 'react';
import { IconPlus, IconChecklist, IconDelete } from '@/icons';
import { Link } from 'react-router-dom';
import { CatalogContext } from '@/context';
import { deleteTodo } from '@/utils';

interface SidebarProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Sidebar(props: SidebarProps) {
  const { className, style } = props;

  const { catalog, updateCatalog } = useContext(CatalogContext);

  const handleDelete = (id: string) => {
    deleteTodo(id);
    setTimeout(() => {
      updateCatalog();
    }, 100);
  };

  return (
    <aside border="r-1 dark:gray-700" className={className} style={style}>
      <div flex="~" justify="between" p="x-3 y-2" border="b-1">
        <IconChecklist className="text-2xl text-gray-600 cursor-pointer" />
        <Link to="new">
          <IconPlus className="text-2xl text-gray-600 rounded-1/2 cursor-pointer hover:bg-gray-100" />
        </Link>
      </div>
      <ul>
        {catalog.map((item, index) => (
          <li
            key={index}
            position="relative"
            flex="~"
            align="items-center"
            p="x-6 y-2"
            bg="hover:light-300"
            cursor="pointer"
            className="group"
            title={item.title}
          >
            <Link className="w-full no-underline" to={item.createdTime + ''}>
              <div text="sm gray-700 truncate" m="b-1">
                {item.title}
              </div>
              <div text="gray-500 xs">
                {new Date(item.modifiedTime).toLocaleString()}
              </div>
            </Link>
            <div
              position="absolute right-2"
              text="gray-400 hover:gray-600"
              title="delete"
              display="hidden"
              group-hover="block"
              onClick={() => handleDelete(item.createdTime.toString())}
            >
              <IconDelete />
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
