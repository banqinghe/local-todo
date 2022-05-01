import Editor from '@/components/Editor';
import TodoList from '@/components/TodoList';
import Default from './Default';
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
      </Routes>
    </main>
  );
}
