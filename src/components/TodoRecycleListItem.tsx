import { IconRestore } from '@/icons';
import { TodoBrief } from '@/types';

interface TodoRecycleListItemProps {
  info: TodoBrief;
  handleRestore: (id: string) => void;
}

export default function TodoRecycleListItem(props: TodoRecycleListItemProps) {
  const { info, handleRestore } = props;
  return (
    <li
      key={info.createdTime}
      position="relative"
      flex="~"
      align="items-center"
      bg="hover:light-300"
      border="b-1 sm:b-0"
      cursor="pointer"
      title={info.title}
      overflow="x-auto"
      className="group"
    >
      <div w="full" p="x-6 y-3 sm:y-2">
        <div text="base sm:sm gray-700 truncate" m="b-1">
          {info.title}
        </div>
        <div text="gray-500 xs">
          {new Date(info.modifiedTime).toLocaleString()}
        </div>
      </div>
      <div
        position="absolute right-2"
        display="block sm:hidden"
        p="4 sm:x-0"
        text="gray-400 hover:gray-600 text-xl sm:text-base"
        group-hover="block"
        title="restore"
        onClick={() => handleRestore(info.createdTime.toString())}
      >
        <IconRestore />
      </div>
    </li>
  );
}
