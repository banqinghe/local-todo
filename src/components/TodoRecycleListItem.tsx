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
      w="full"
      bg="hover:light-300"
      cursor="pointer"
      title={info.title}
      className="group"
    >
      <div w="full" p="x-6 y-2">
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
