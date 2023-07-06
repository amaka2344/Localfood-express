import React from 'react'
import MainPageNavBar from '../../components/mainPageNavbar/mainPageNav'
import Footer from '../../components/Footer'

const RecentOrders = () => {
  return (
    <div>
    <MainPageNavBar/>
    <div className='p-[50px] flex lg:pt-[8%] md:pt-[10%] sm:pt-[12%] px-[6%]'>
        <div className='flex-[2]'>
            <div>
                <table className="w-full border-collapse text-left pt-4 text-black">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Address</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <span className="font-normal text-xl">4389r8r4t49r84</span>
                            </td>
                            <td>
                                <span>Micheal John</span>
                            </td>
                            <td>
                                <span>No 8, balle street, mexico</span>
                            </td>
                            <td>
                                <span className="font-medium text-2xl">$500</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <Footer />
</div>
)
}

export default RecentOrders