import { Link } from 'react-router-dom';
import { IconDelete } from '@/icons';
import { TodoBrief } from '@/types';
import cn from 'classnames';

interface TodoInfoListItemProps {
  info: TodoBrief;
  activeKey: string;
  handleDelete: (id: string) => void;
}

export default function TodoInfoListItem(props: TodoInfoListItemProps) {
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
