import { createblogInput, updateBlog } from "@kaushal_patel_07/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
// Define the blog router
export const blogRouter = new Hono();
// Middleware to verify JWT and set userId
blogRouter.use("/*", async (c, next) => {
    const jwt = c.req.header("authorization") || "";
    try {
        let user = await verify(jwt, c.env.JWT_SECRET);
        if (!user) {
            c.status(403);
            return c.json({
                error: "invalid"
            });
        }
        // @ts-ignore
        c.set("userId", user.id);
        await next();
    }
    catch (e) {
        c.status(403);
        return c.json({
            message: "invalid or expired token"
        });
    }
});
// Route to create a new blog post
blogRouter.post("/", async (c) => {
    const body = await c.req.json();
    const { success } = createblogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "incorrect inputs"
        });
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        // @ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get("userId");
    if (!userId) {
        c.status(403);
        return c.json({
            message: "User ID not found"
        });
    }
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId,
        }
    });
    return c.json({
        id: blog.id
    });
});
// Route to get multiple blog posts (pagination to be added)
blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        // @ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });
    return c.json({ blogs });
});
// Route to update a blog post
blogRouter.put("/", async (c) => {
    const body = await c.req.json();
    const { success } = updateBlog.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "incorrect inputs"
        });
    }
    const prisma = new PrismaClient({
        // @ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.post.update({
        where: {
            id: body.id // type of id is uuid which declared in schema
        },
        data: {
            title: body.title,
            content: body.content,
        }
    });
    return c.json({
        id: blog.id
    });
});
// Route to get a blog post
blogRouter.get("/:id", async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        // @ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json({ blog });
    }
    catch (e) {
        c.status(403);
        return c.json({
            message: "some error occurred"
        });
    }
});
blogRouter.delete(":/id", async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        // @ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    await prisma.post.delete({
        where: {
            id: id
        }
    });
    return c.json({
        message: "blog post deleted successfully"
    });
});
