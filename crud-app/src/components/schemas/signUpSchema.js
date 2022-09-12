import * as Yup from 'yup'

export const signUpSchema = Yup.object({
    name:Yup.string().min(3).max(10).required("Name Field Is Require"),
    email:Yup.string().email().required("Email Is Required"),
    password:Yup.string().required("Password Is Required"),
    rePassword:Yup.string().required().oneOf([Yup.ref("password"),null],"Password Must Match")
})