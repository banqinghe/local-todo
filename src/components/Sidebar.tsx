import { useState } from 'react';
import { IconPlus, IconChecklist, IconDelete } from '@/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { deleteTodo, restoreTodo, isNarrowScreen } from '@/utils';
import TodoInfoListItem from '@/components/TodoInfoListItem';
import TodoRecycleListItem from '@/components/TodoRecycleListItem';
import { useRecoilValue } from 'recoil';
import { sidebarInfoState } from '@/recoil/atoms';
import useUpdateSidebar from '@/hooks/useUpdateSidebar';

interface SidebarProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Sidebar(props: SidebarProps) {
  const { className, style } = props;

  const sidebarInfo = useRecoilValue(sidebarInfoState);
  const updateSidebar = useUpdateSidebar();
  const navigate = useNavigate();

  const [activeKey, setActiveKey] = useState<string>('');
  const [showType, setShowType] = useState<'todo' | 'recycle'>('todo');

  const location = useLocation();

  if (location.pathname.slice(1) !== activeKey) {
    setActiveKey(location.pathname.slice(1));
  }

  const handleDelete = (id: string) => {
    deleteTodo(id)
      .then(() => updateSidebar())
      .then(({ todoInfoList }) => {
        if (isNarrowScreen() && todoInfoList.length) {
          navigate('/list');
        } else if (todoInfoList.length) {
          navigate('/' + todoInfoList[0].createdTime);
        } else {
          navigate('/');
        }
      });
  };

  const handleRestore = (id: string) => {
    restoreTodo(id).then(() => {
      updateSidebar();
      navigate('/' + id);
    });
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
