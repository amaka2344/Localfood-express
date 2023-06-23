import { MdFavoriteBorder } from "react-icons/md";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Link from "next/link";

const MenuDropdown = () => {
    return (
        <div className="absolute right-0 z-10  bg-amber-50 font-medium shadow w-max  overflow-hidden transition-all h-[100px]">
            <ul className="text-sm  ">
                <li>
                    <Link href='/register' >
                        <a>
                            <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
                                <MdFavoriteBorder className="text-lg me-3" /> Register
                            </span>
                        </a>
                    </Link>

                </li>
                <li>
                    <Link href='/login' >
                        <a>
                            <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
                                <MdFavoriteBorder className="text-lg me-3" /> Login
                            </span>
                        </a>
                    </Link>

                </li>
                <li>
                    <Link href='/cart'>
                        <a>
                            <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
                                <AiOutlineShoppingCart className="text-lg me-3" /> Cart
                            </span>
                        </a>

                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default MenuDropdown;