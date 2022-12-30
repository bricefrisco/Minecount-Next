import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";

const Navigation = () => {
  const { user, error, isLoading } = useUser();
  const { pathname } = useRouter();

  return (
    <div className="sticky border-b border-neutral-700 pt-2 pb-2">
      <nav className="container mx-auto flex place-content-between items-center">
        <Image width={48} height={48} src="/logo.png" alt="Minecount Logo" />
        <ul class="flex text-gray-300">
          <li>
            <Link href="/" className="hover:text-white">
              Home
            </Link>
          </li>
          <li className="ml-5">
            <Link href="/minecraft-servers" className={"hover:text-white"}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
