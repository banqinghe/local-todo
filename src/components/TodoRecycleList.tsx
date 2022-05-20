import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { sidebarInfoState } from '@/recoil/atoms';
import { restoreTodo } from '@/utils';
import { IconDelete } from '@/icons';
import useUpdateSidebar from '@/hooks/useUpdateSidebar';
import TodoRecycleListItem from './TodoRecycleListItem';

export default function TodoInfoList() {
  const { todoRecycleList } = useRecoilValue(sidebarInfoState);
  const updateSidebar = useUpdateSidebar();

  const navigate = useNavigate();

  const handleRestore = (id: string) => {
    restoreTodo(id).then(() => {
      updateSidebar();
      navigate('/' + id);
    });
  };

  return (
    <div>
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
      {todoRecycleList?.map(item => (
        <TodoRecycleListItem
          key={item.createdTime}
          info={item}
          handleRestore={handleRestore}
        />
      ))}
    </div>
  );
}
