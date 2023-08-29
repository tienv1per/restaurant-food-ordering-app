"use client";
import { useCartStore } from '@/utils/store';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CartIcon = () => {
    const { totalItems } = useCartStore();
    return (
        <div>
            <Link href="/cart" className="flex items-center gap-4">
                <div className="relative w-8 h-8 md:w-5 md:h-5">
                    <Image src="/cart.png" alt="" fill/>
                </div>
                <span>Cart ({totalItems})</span>
            </Link>
        </div>
    )
};

export default CartIcon;