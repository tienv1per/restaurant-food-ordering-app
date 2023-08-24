"use client";
import { OrderType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const OrdersPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	if(status === "unauthenticated") {
		router.push("/");
	}

	const { isLoading, error, data } = useQuery({
		queryKey: ['orders'], // unique key
		queryFn: () =>
		fetch('http://localhost:3000/api/orders').then(
			(res) => res.json(),
		),
  	});

	const queryClient = useQueryClient();

	// useMutation là một hook được cung cấp bởi thư viện React Query để thực hiện các hoạt động liên quan đến việc thay đổi dữ liệu (mutate data) trên máy chủ. 
	// Nó được sử dụng để gửi các yêu cầu HTTP như POST, PUT, DELETE để thay đổi dữ liệu trên máy chủ và cập nhật dữ liệu trong ứng dụng của bạn 
	// mà không cần tải lại toàn bộ trang.
	const mutation = useMutation({
		// một hàm callback, chấp nhận một đối tượng chứa thông tin cần thiết để thực hiện mutation (trong trường hợp này là id và status). 
		// Trong phần này, bạn đang sử dụng hàm fetch để gửi yêu cầu PUT đến một địa chỉ API cụ thể để cập nhật trạng thái đơn hàng dựa trên id và status
		mutationFn: ({id, status}: {id: string, status: string}) => {
			return fetch(`http://localhost:3000/api/orders/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(status)
			});
		},
		// sử dụng queryClient.invalidateQueries để làm mới cache của truy vấn có queryKey là ["orders"]. 
		// Điều này đồng nghĩa với việc sau khi mutation thành công, dữ liệu của truy vấn "orders" sẽ được làm mới, 
		// đảm bảo rằng dữ liệu hiển thị trên giao diện người dùng luôn được cập nhật theo trạng thái mới nhất sau khi cập nhật.
		onSuccess() {
			queryClient.invalidateQueries({queryKey: ["orders"]})
		}
	});

	const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const input = form.elements[0] as HTMLInputElement;
		const status = input.value;

		mutation.mutate({id: id, status: status});

		toast.success("Order status has been updated");
	};

	if (isLoading || status === "loading") return 'Loading...';

	return (
		<div className="p-4 lg:px-20 xl:px-40">
			<table className="w-full border-separate border-spacing-3">
				<thead>
					<tr className="text-left">
						<th className="hidden md:block">Order ID</th>
						<th>Date</th>
						<th>Price</th>
						<th className="hidden md:block">Products</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item: OrderType) => (
						<tr className={`${item.status !== "delivered" && "bg-red-50"}`} key={item.id}>
							<td className="hidden md:block py-6 px-1">{item.id}</td>
							<td className="py-6 px-1">{item.createdAt.toString().slice(0, 10)}</td>
							<td className="py-6 px-1">{item.price}</td>
							<td className="hidden md:block py-6 px-1">{item.products[0].title}</td>
							{session?.user.isAdmin ? (
								<td>
									<form className="flex items-center justify-center gap-4" onSubmit={(e) => handleUpdate(e, item.id)}>
										<input placeholder={item.status} className="p-2 ring-1 ring-red-100 rounded-md"/>
										<button className="bg-red-400 p-2 rounded-full">
											<Image src="/edit.png" alt="" width={20} height={20}/>
										</button>
									</form>
								</td>
							) : (<td className="py-6 px-1">{item.status}</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default OrdersPage;