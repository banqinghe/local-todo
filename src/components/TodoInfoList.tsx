import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { sidebarInfoState } from '@/recoil/atoms';
import { deleteTodo, isNarrowScreen } from '@/utils';
import useUpdateSidebar from '@/hooks/useUpdateSidebar';
import TodoInfoListItem from './TodoInfoListItem';

export default function TodoInfoList() {
  const { todoInfoList } = useRecoilValue(sidebarInfoState);
  const updateSidebar = useUpdateSidebar();

  const navigate = useNavigate();

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

  useEffect(() => {
    if (!todoInfoList.length) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      {todoInfoList?.map(item => (
        <TodoInfoListItem
          key={item.createdTime}
          info={item}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}
