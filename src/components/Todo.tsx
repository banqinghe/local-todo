import Editor from '@/components/Editor';
import TodoList from '@/components/TodoList';
import { Routes, Route, Navigate } from 'react-router-dom';

interface TodoProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Todo(props: TodoProps) {
  const { className, style } = props;

  return (
    <main overflow="auto" className={className} style={style}>
      <div text="[15px]">
        <Routes>
          <Route path="/" element={<div />} />
          <Route path="/:id" element={<TodoList />} />
          <Route path="/new" element={<Editor />} />
          <Route path="/modify/:id" element={<Editor />} />
        </Routes>
      </div>
    </main>
  );
}
