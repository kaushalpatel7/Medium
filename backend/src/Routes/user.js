import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinInput, signupInput } from "@kaushal_patel_07/medium-common";
export const userRouter = new Hono();
userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success, error } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "incorrect inputs"
        });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            },
        });
        const token = await sign({ id: user.id }, "kaushal");
        return c.text(token);
    }
    catch (e) {
        console.log(e);
        c.status(411);
        return c.text("invalid");
    }
});
userRouter.post("/signin", async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "incorrect inputs"
        });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try {
        const username = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });
        if (!username) {
            c.status(403);
            return c.json({
                error: "some error occured"
            });
        }
        const jwt = await sign({ id: username.id }, "kaushal");
        return c.text(jwt);
    }
    catch (e) {
        console.log(e);
        c.status(411);
        return c.text("Invalid");
    }
});
