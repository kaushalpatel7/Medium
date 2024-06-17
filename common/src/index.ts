import z from "zod"

export const signupInput = z.object({
    email : z.string().min(6),
    password : z.string().min(8),
    name : z.string().optional()
})

export const signinInput = z.object({
    email : z.string().min(6),
    password : z.string().min(8)
})

export const createblogInput = z.object({
    title : z.string().min(5),
    content : z.string().min(100),
    
})

export const updateBlog = z.object({
    title : z.string().min(5),
    content : z.string().min(100),
    id : z.string()
    })
    
    
export type signupInput = z.infer<typeof signupInput> 
export type signinInput = z.infer<typeof signinInput>
export type createblogInput = z.infer<typeof createblogInput>
export type updateBlog = z.infer<typeof updateBlog>
    


// jidagi kesi hai paheli raheee kabhi to hasaye kabhi ye rulaye 
// zindagi kemni chali rahi che yaar shu kari shakay
//  there is my mistake so what should i do now 



