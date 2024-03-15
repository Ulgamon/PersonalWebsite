import AnimatedSwitch from "../animated-switch/AnimatedSwitch";
import Logo from "../logo/Logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { IoMenu } from "react-icons/io5";

interface IAppOutlet {
  children: string | JSX.Element | JSX.Element[];
}

const AppOutlet = ({ children }: IAppOutlet) => {
  return (
    <main className="w-full min-h-screen text-black text-4xl dark:text-white">
      <nav className="flex">
        <Logo />
        <ul className=""></ul>
        <Sheet>
          <SheetTrigger asChild>
            <IoMenu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>
                <AnimatedSwitch />
              </SheetTitle>
            </SheetHeader>
            <ul>
              <li>Tojica</li>
              <li>Tojica</li>
              <li>Tojica</li>
              <li>Tojica</li>
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
      {children}
      <footer></footer>
    </main>
  );
};

export default AppOutlet;
