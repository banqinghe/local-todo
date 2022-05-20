import { Link, useLocation } from 'react-router-dom';
import { IconPlus, IconDelete, IconChecklist } from '@/icons';
import cn from 'classnames';

const nav = [
  { icon: <IconChecklist />, path: '/list' },
  { icon: <IconPlus />, path: '/new' },
  { icon: <IconDelete />, path: '/deleted' },
];

const listActivePathReg = /(^\/$)|(^\/list$)|(^\/\d+$)|(^\/modify\/\d+$)/;

interface NavItemProps {
  path: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

function NavItem(props: NavItemProps) {
  const { path, icon, isActive = false } = props;
  return (
    <li>
      <Link
        className={cn('block p-3 transition', {
          'text-gray-600 transform scale-105': isActive,
          'text-gray-300': !isActive,
        })}
        to={path}
      >
        {icon}
      </Link>
    </li>
  );
}

export default function FooterNav() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav
      position="fixed bottom-4 left-0 right-0"
      display="md:hidden"
      w="[90vw]"
      m="x-auto"
      bg="white"
      border="rounded-xl"
      shadow="~"
    >
      <ul flex="~" justify="between" p="x-3" text="[30px]">
        {nav.map(item => (
          <NavItem
            key={item.path}
            path={item.path}
            icon={item.icon}
            isActive={
              item.path === '/list'
                ? listActivePathReg.test(pathname)
                : pathname === item.path
            }
          />
        ))}
      </ul>
    </nav>
  );
}
