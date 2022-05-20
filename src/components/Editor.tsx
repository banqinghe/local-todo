import { useRef, useEffect } from 'react';
import { getTodo, modifyTodo, saveTodo } from '@/utils';
import { useNavigate, useParams } from 'react-router-dom';
import useUpdateSidebar from '@/hooks/useUpdateSidebar';
import { IconSave } from '@/icons';

const textareaExample = `# Title

- todo 1
- todo 2
- todo 3

Note: All statements not starting with '# ' or '- ' will be ignore. Title should be front of todo list.
`;

export default function Editor() {
  const updateSidebar = useUpdateSidebar();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();
  const id = useParams().id;
  const isModify = !!id;

  const saveTodoList = () => {
    const text = textAreaRef.current!.value;
    const lines = text
      .split('\n')
      .filter(line => line.startsWith('# ') || line.startsWith('- '));
    const title = lines[0].replace(/^#\s/, '').trim();
    const todoList = lines
      .slice(1)
      .map(line => line.replace(/^-\s/, '').trim());
    if (isModify) {
      modifyTodo(id, title, todoList).then(() => updateSidebar());
      navigate('/' + id);
    } else {
      const createdTime = Date.now();
      saveTodo(createdTime, title, todoList).then(() => updateSidebar());
      navigate('/' + createdTime);
    }
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
      saveTodoList();
    }
  };

  const handleClickSave = () => {
    saveTodoList();
  };

  useEffect(() => {
    if (isModify) {
      getTodo(id).then(todo => {
        if (!todo) {
          return;
        }
        textAreaRef.current!.value =
          '# ' +
          todo.title +
          '\n\n' +
          todo.todoList.map(({ content }) => '- ' + content).join('\n\n');
        resizeTextArea();
        textAreaRef.current!.focus();
      });
    } else {
      textAreaRef.current!.value = textareaExample;
      resizeTextArea();
      textAreaRef.current!.focus();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [id]);

  return (
    <div>
      <div flex="~" justify="end" align="items-center" p="x-6 y-2" border="b-1">
        <div title="save" onClick={handleClickSave}>
          <IconSave className="text-2xl p-0.5 rounded cursor-pointer hover:bg-gray-100" />
        </div>
      </div>
      <div w="10/12 sm:8/12" m="x-auto" p="y-6">
        <textarea
          ref={textAreaRef}
          id="todo-content-editor"
          resize="none"
          outline="none"
          autoComplete="off"
          w="full"
          bg="light-50"
          onChange={handleValueChange}
          overflow="hidden"
          font="leading-5 "
        />
      </div>
    </div>
  );
}
