import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./connect";


// mở rộng module "next-auth" bằng cách khai báo một interface mới cho đối tượng Session. 
// Trong ngữ cảnh của next-auth, Session là một đối tượng chứa thông tin liên quan đến phiên đăng nhập của người dùng.
// => định nghĩa lại kiểu dữ liệu của đối tượng Session trong module "next-auth" để bổ sung thông tin về người dùng
declare module "next-auth" {
    interface Session {
        // mở rộng kiểu User bằng cách thêm một thuộc tính isAdmin với kiểu dữ liệu Boolean
        user: User & {
            isAdmin: Boolean;
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        isAdmin: Boolean;
    }
}

// kết nối NextAuth.js với cơ sở dữ liệu được quản lý bởi Prisma
// tích hợp quá trình xác thực và quản lý phiên làm việc với CSDL của bạn thông qua Prisma. 
// Adapter này giúp bạn thực hiện các tác vụ như lưu thông tin người dùng, phiên làm việc và token xác thực vào CSDL của Prisma.
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
    callbacks: {
        // được gọi mỗi khi phiên người dùng được tạo hoặc cập nhật
        // thêm thông tin tùy chỉnh vào đối tượng session, mà sau đó sẽ được lưu trữ trong phiên người dùng.
        async session({token, session}){
            if(token){
                session.user.isAdmin = token.isAdmin;
            }
            return session;
        },
        // được gọi mỗi khi NextAuth tạo hoặc kiểm tra token JWT
        // kiểm tra và tùy chỉnh thông tin trong token trước khi nó được sử dụng
        async jwt({ token }){
            const userInDB = await prisma.user.findUnique({
                where: {
                    email: token.email as string,
                },
            });
            token.isAdmin = userInDB?.isAdmin as boolean;
            return token;
        }
    }
};

// with this function, we can get user and session in server components
export const getAuthSession = () => getServerSession(authOptions);