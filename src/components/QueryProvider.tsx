"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

type Props = {
    children: React.ReactNode;
};

// quản lý trạng thái và tương tác với dữ liệu trong ứng dụng React. 
// Nó được thiết kế để giúp bạn quản lý việc fetching (truy vấn) dữ liệu từ server, caching dữ liệu, 
// và duy trì trạng thái ứng dụng một cách hiệu quả và linh hoạt
const queryClient = new QueryClient();

// cung cấp QueryClient cho các thành phần con của ứng dụng
// Khi sử dụng QueryProvider để bọc các thành phần con của ứng dụng, các thành phần này có thể sử dụng QueryClient 
// để quản lý trạng thái và tương tác với dữ liệu thông qua thư viện react-query.
const QueryProvider = ({children}: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
};

export default QueryProvider;