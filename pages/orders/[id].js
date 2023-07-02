import React from 'react'
import Image from 'next/image'
import styles from '../../styles/orders.module.css'

const Order = () => {
    const status = 0

    const statusClass = (index) => {
        if (index - status < 1) return styles.done
        if (index - status === 1) return styles.inProgress
        if (index - status > 1) return styles.undone
    }
    return (
        <div className='p-[50px] flex lg:pt-[6%] md:pt-[10%] sm:pt-[12%] px-[6%]'>
            <div className='flex-[2]'>
                <div>
                    <table className="w-full border-collapse text-left  text-black">
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

                <div className=' last:flex last:justify-between w-[80%] pt-[10%]  text-black'>
                    <div className={statusClass(0)}>
                        <Image src='/Paid.png' width={30} height={30} />
                        <span>
                            Payment
                        </span>
                        <div className={styles.checkedIcon}>
                            <Image className={styles.checkedIcon} src='/checkedIcon.png' width={20} height={20} />
                        </div>
                    </div>
                    <div className={statusClass(1)}>
                        <Image src='/cooking.png' width={30} height={30} />
                        <span>
                            Preparing
                        </span>
                        <div className={styles.checkedIcon}>
                            <Image className={styles.checkedIcon} src='/checkedIcon.png' width={20} height={20} />
                        </div>
                    </div>
                    <div className={statusClass(2)}>
                        <Image src='/fast-delivery.png' width={30} height={30} />
                        <span>
                            On The Way
                        </span>
                        <div className={styles.checkedIcon}>
                            <Image className={styles.checkedIcon} src='/checkedIcon.png' width={20} height={20} />
                        </div>
                    </div>
                    <div className={statusClass(3)}>
                        <Image src='/delivered.png' width={30} height={30} />
                        <span>
                            Delivered
                        </span>
                        <div className={styles.checkedIcon}>
                            <Image className={styles.checkedIcon} src='/checkedIcon.png' width={20} height={20} />
                        </div>
                    </div>
                </div>
            </div>

            <div className=' flex-[1]  text-black'>
                <div className="w-full max-w-md bg-amber-100 p-8 flex flex-col justify-between mt-10">
                    <h2 className="text-2xl font-bold mb-4">CART TOTAL</h2>
                    <div className="mb-2">
                        <b className='mr-[10px]'>Subtotal:</b> $700.00
                    </div>
                    <div className="mb-2">
                        <b className='mr-[10px]' >Discount:</b> $0.00
                    </div>
                    <div className="mb-2">
                        <b className='mr-[10px]'>Total:</b> $700.00
                    </div>
                    <button disabled className="bg-[#A1C75C] text-white py-2 px-4 rounded-md cursor-not-allowed font-medium h-[30px] mt-[20px]">
                        Paid
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Order

