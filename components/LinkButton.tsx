import Link from "next/link";

type Props = {
  href: string;
  className?: string;
  children?: any;
  disabled?: boolean;
};

const LinkButton = ({ href, className, children, disabled }: Props) => {
  if (disabled) {
    return (
      <span
        className={`flex cursor-not-allowed rounded border border-neutral-700 pl-2 pr-2 pt-1 pb-1 text-gray-400 ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`flex cursor-pointer rounded border border-neutral-700 pl-2 pr-2 pt-1 pb-1 text-gray-300 hover:border-neutral-600 hover:text-gray-100 ${className}`}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
