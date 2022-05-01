import { IconCheckboxBlank, IconCheckboxChecked } from '@/icons';
import { TodoItem } from '@/types';

export default function TodoListItem({
  content,
  checked,
  onCheck,
  index,
}: TodoItem & { onCheck: (index: number) => void; index: number }) {
  return (
    <div
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
          onChange={() => onCheck(index)}
        />
        {checked ? (
          <IconCheckboxChecked />
        ) : (
          <IconCheckboxBlank className="text-gray-300" />
        )}
      </label>
      <p font="leading-7" className={checked ? 'opacity-30 line-through' : ''}>
        {content}
      </p>
    </div>
  );
}
