import { AiOutlineShoppingCart } from 'react-icons/ai'
import {BsPersonAdd, BsPeople} from 'react-icons/bs'
import Link from "next/link";

const MainMenuDropdown = () => {
    return (
        <div className="absolute right-0 z-10  bg-amber-50 font-medium shadow w-max  overflow-hidden transition-all h-[100px]">
            <ul className="text-sm  ">  
                <li>
                    <Link href='/admin/'>
                        <a>
                            <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
                                <BsPeople className="text-lg me-3" /> Register As a Restaurant
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
                <li>
                    <Link href='/cart'>
                        <a>
                            <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
                                <BsPersonAdd className="text-lg me-3" /> Profile
                            </span>
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default MainMenuDropdown;