interface ChildrenProps {
  children: JSX.Element | JSX.Element[] | string;
}
export const Header1 = ({ children }: ChildrenProps) => {
  return (
    <h1 className="text-4xl font-bold bg-slate-950 dark:bg-neutral-100">
      {children}
    </h1>
  );
};

export const Span = ({ children }: ChildrenProps) => {
  return (
    <span className="text-sx bg-yellow-400 dark:bg-yellow-500">{children}</span>
  );
};
