import { useRef, useEffect, useContext } from 'react';
import { modifyTodo, saveTodo } from '@/utils';
import { useNavigate, useParams } from 'react-router-dom';
import { CatalogContext } from '@/context';

const textareaExample = `# Title

- todo 1
- todo 2
- todo 3

Note: All statements not starting with '# ' or '- ' will be ignore. Title should be front of todo list.
`;

export default function TextArea() {
  const { updateCatalog } = useContext(CatalogContext);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();
  const id = useParams().id;
  const isModify = !!id;

  const saveTodoList = (text: string) => {
    const lines = text
      .split('\n')
      .filter(line => line.startsWith('# ') || line.startsWith('- '));
    const title = lines[0].replace(/^#\s/, '');
    const todoList = lines.slice(1).map(line => line.replace(/^-\s/, ''));
    if (isModify) {
      modifyTodo(id, title, todoList);
      navigate('/' + id);
    } else {
      const createdTime = Date.now();
      saveTodo(createdTime, title, todoList);
      navigate('/' + createdTime);
    }
    setTimeout(() => {
      updateCatalog();
    }, 100);
  };

  const resizeTextArea = () => {
    textAreaRef.current!.style.height = 'auto';
    textAreaRef.current!.style.height =
      textAreaRef.current!.scrollHeight + 'px';
  };

  const handleValueChange = () => {
    resizeTextArea();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === 's' && e.ctrlKey) {
      e.preventDefault();
      saveTodoList(textAreaRef.current!.value);
    }
  };

  useEffect(() => {
    textAreaRef.current!.value = textareaExample;
    resizeTextArea();
    textAreaRef.current!.focus();

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <textarea
      ref={textAreaRef}
      id="todo-content-editor"
      w="full"
      resize="none"
      outline="none"
      autoComplete="off"
      bg="light-50"
      onChange={handleValueChange}
      overflow="hidden"
      font="leading-5 "
    />
  );
}
