import { Hono } from 'hono'
import { userRouter } from './Routes/user';
import { blogRouter } from './Routes/blog';
import { cors } from 'hono/cors';


const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET : string
	}
}>();
app.use("/*",cors())
app.route("/api/v1/user",userRouter),
app.route("/api/v1/blog",blogRouter)

// app.use("/api/v1/blog/*",async (c,next)=>{

//   const header = c.req.header("Authorization") || ""
//   if(!header){
//     c.status(403)
//     return c.json({
//       error : "unauthorised"
//     })
//   }
//   const token = header.split(" ")[1]
//   const response = await verify(token,"kaushal")
//   if(response.id){
//     await next()
//   }
//   else{
//     c.status(403)
//     return c.json({
//       error :"user not found"
//     })
//   }

// })

export default app
