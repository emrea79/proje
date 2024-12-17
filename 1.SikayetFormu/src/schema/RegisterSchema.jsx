import * as yup from 'yup'

export const registerSchema = yup.object().shape({
    username: yup.string().required("Username boş bırakılmaz"),
    password: yup.string().required("Şifre boş bırakılmaz")
})