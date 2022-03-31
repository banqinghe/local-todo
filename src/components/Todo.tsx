import TextArea from '@/components/TextArea';
import TodoList from '@/components/TodoList';
import { Routes, Route, Navigate } from 'react-router-dom';

interface TodoProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Todo(props: TodoProps) {
  const { className, style } = props;

  return (
    <main p="y-12" overflow="auto" className={className} style={style}>
      <div w="8/12" m="x-auto" space="y-3" text="[15px]">
        <Routes>
          <Route path="/" element={<div />} />
          <Route path="/:id" element={<TodoList />} />
          <Route path="/new" element={<TextArea />} />
          <Route path="/modify/:id" element={<TextArea />} />
        </Routes>
      </div>
    </main>
  );
}
