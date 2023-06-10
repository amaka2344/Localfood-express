import { MdFavoriteBorder } from "react-icons/md";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Link from "next/link";

const MenuDropdown = () => {
    return (
        <div className="absolute right-0 z-10  bg-amber-50 font-medium shadow w-max  overflow-hidden transition-all h-[70px]">
            <ul className="text-sm  ">
                <li>
                    <Link href='/favorites' >
                        <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
                            <MdFavoriteBorder className="text-lg me-3" /> Favorites
                        </span>
                    </Link>

                </li>
                <li>
                    <Link href='/cart'>
                        <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
                            <AiOutlineShoppingCart className="text-lg me-3" /> Cart
                        </span>
                    </Link>

                </li>
            </ul>
        </div>
    );
};

export default MenuDropdown;