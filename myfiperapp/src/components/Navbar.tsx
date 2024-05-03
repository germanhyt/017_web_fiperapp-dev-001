import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="bg-green-700">
      <nav className="container mx-auto py-4 flex justify-between items-center ">
        <div>
          <Link href="/">
            <Image
              src="/myfiper.ico"
              alt="Vercel Logo"
              width={30}
              height={30}
            />
          </Link>
        </div>
        <div>
          <ul className="flex justify-between gap-2 text-white">
            <li className="font-semibold text-white hover:text-black">
              <Link href="/">Home</Link>
            </li>
            <li className="font-semibold text-white hover:text-black">
              <Link href="/operations">Operaciones</Link>
            </li>
            <li className="font-semibold text-white hover:text-black">
              <Link href="/new">Nueva Operación</Link>
            </li>
            <li className="font-semibold text-white hover:text-black">
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
