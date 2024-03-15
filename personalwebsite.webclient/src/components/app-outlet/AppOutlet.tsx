import Logo from "../logo/Logo";

interface IAppOutlet {
  children: string | JSX.Element | JSX.Element[];
}

const AppOutlet = ({ children }: IAppOutlet) => {
  return (
    <main className="w-full min-h-screen text-black text-4xl dark:text-white">
      <nav className="flex">
        <Logo />
        <ul className=""></ul>
        <button className=""></button>
      </nav>
      {children}
      <footer></footer>
    </main>
  );
};

export default AppOutlet;
