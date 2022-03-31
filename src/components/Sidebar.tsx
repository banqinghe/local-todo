import { useContext } from 'react';
import { IconPlus, IconChecklist } from '@/icons';
import { Link } from 'react-router-dom';
import { CatalogContext } from '@/context';

interface SidebarProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Sidebar(props: SidebarProps) {
  const { className, style } = props;

  const { catalog, updateCatalog } = useContext(CatalogContext);

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
          <li key={index} p="x-6 y-2" bg="hover:light-300" cursor="pointer">
            <Link className="no-underline" to={item.createdTime + ''}>
              <div text="sm gray-700" m="b-1">
                {item.title}
              </div>
              <div text="gray-500 xs">
                {new Date(item.modifiedTime).toLocaleString()}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
