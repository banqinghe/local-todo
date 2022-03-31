interface HeaderProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Header(props: HeaderProps) {
  const { className, style } = props;
  return (
    <header
      flex="~"
      justify="between"
      align="items-center"
      p="x-6 y-3"
      border="b-1 dark:gray-700"
      select="none"
      className={className}
      style={style}
    >
      <h1 text="xl" font="bold">
        TODO
      </h1>
      <div></div>
    </header>
  );
}
