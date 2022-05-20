import { Link } from 'react-router-dom';
import { IconDelete } from '@/icons';
import { TodoBrief } from '@/types';
import cn from 'classnames';

interface TodoInfoListItemProps {
  info: TodoBrief;
  activeKey?: string;
  handleDelete: (id: string) => void;
}

export default function TodoInfoListItem(props: TodoInfoListItemProps) {
  const { info, activeKey = '', handleDelete } = props;

  return (
    <li
      key={info.createdTime}
      position="relative"
      flex="~"
      align="items-center"
      w="full"
      bg="hover:light-300"
      overflow="x-auto"
      cursor="pointer"
      border="b-1 sm:b-0"
      className={cn('thin-x-scrollbar group snap snap-x snap-mandatory', {
        'bg-light-300 border-r-2': activeKey === info.createdTime.toString(),
      })}
      title={info.title}
    >
      <Link
        className="w-[100vw] snap-start flex-shrink-0 px-6 py-3 sm:py-2 no-underline"
        to={'/' + info.createdTime}
      >
        <div text="base sm:sm gray-700 truncate" m="b-1">
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
        display="invisible sm:visible hidden "
        group-hover="block"
        onClick={() => handleDelete(info.createdTime.toString())}
      >
        <IconDelete />
      </div>
      <button
        w="min-max"
        p="x-5"
        bg="red-400"
        text="[24px] white"
        display="flex sm:hidden"
        justify="center"
        align="self-stretch items-center"
        className="snap-end"
        onClick={() => handleDelete(info.createdTime.toString())}
      >
        <IconDelete />
      </button>
    </li>
  );
}
