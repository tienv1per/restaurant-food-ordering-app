import { ActionTypes, CartType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
    products: [],
    totalItems: 0,
    totalPrice: 0
};
// sử dụng thư viện Zustand để tạo một store quản lý trạng thái của giỏ hàng
// tạo ra một store quản lý trạng thái giỏ hàng trong ứng dụng của mình, 
// có khả năng thêm và xoá sản phẩm từ giỏ hàng và cập nhật tổng số lượng sản phẩm và tổng giá tiền một cách dễ dàng
// set là một hàm để cập nhật trạng thái
// get là một hàm để lấy giá trị hiện tại của trạng thái
export const useCartStore = create(persist<CartType & ActionTypes>((set, get) => ({
    products: INITIAL_STATE.products,
    totalItems: INITIAL_STATE.totalItems,
    totalPrice: INITIAL_STATE.totalPrice,
    addToCart(item) {
        // set là một hàm để cập nhật trạng thái
        set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
        }));
    },
    removeFromCart(item) {
        set((state) => ({
            products: state.products.filter((product) => product.id !== item.id),
            totalItems: state.totalItems - item.quantity,
            totalPrice: state.totalPrice - item.price,
        }));
    },
    }),
    {name: "cart"}
));