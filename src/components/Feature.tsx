import Image from 'next/image';
import React from 'react'

const Feature = () => {
    return (
        <div className='w-screen overflow-x-scroll text-red-500'>
            {/* WRAPPER */}
            <div className='w-max flex'>
                {/* SINGLE ITEM */}
                <div className=''>
                    {/* IMAGE CONTAINER */}
                    <div className='relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500'>
                        <Image src="" alt='' fill className='object-contain'/>
                    </div>
                    {/* TEXT CONTAINER */}
                    <div className='flex-1 flex flex-col items-center justify-center text-center gap-4'>
                        <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl"></h1>
                        <p className="p-4 2xl:p-8"></p>
                        <span className="text-xl font-bold">$123</span>
                        <button className='bg-red-500 text-white p-2 rounded-md'>
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Feature;