import Editor from './Editor';
import TodoList from './TodoList';
import Default from './Default';
import TodoInfoList from './TodoInfoList';
import TodoRecycleList from './TodoRecycleList';
import { Routes, Route } from 'react-router-dom';

interface TodoProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Main(props: TodoProps) {
  const { className, style } = props;

  return (
    <main overflow="auto" text="[15px]" className={className} style={style}>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/:id" element={<TodoList />} />
        <Route path="/new" element={<Editor />} />
        <Route path="/modify/:id" element={<Editor />} />
        <Route path="/list" element={<TodoInfoList />} />
        <Route path="/deleted" element={<TodoRecycleList />} />
      </Routes>
    </main>
  );
}
