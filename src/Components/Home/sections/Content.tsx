import type { PropsWithChildren } from "react";

interface IHeaderProps extends PropsWithChildren {
  additionalClasses?: string;
}

export const Header = ({ children, additionalClasses }: IHeaderProps) => {
  return (
    <header
      className={`${additionalClasses} h-14 w-full flex items-center px-4 bg-black/80 backdrop-blur-md border-b border-neutral-800 sticky top-0 z-10"`}
    >
      {children}
    </header>
  );
};

export const Content = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen w-full bg-black text-white border-x border-neutral-700">
      {children}
    </div>
  );
};
