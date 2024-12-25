import * as yup from 'yup'

export const formSchema = yup.object().shape({
    name: yup.string().required("İsim Boş Bırakılamaz"),
    surname: yup.string().required("Soyisim Boş Bırakılamaz"),
    ministry: yup.string().required("Bir seçeneği seçiniz."),
    complaint: yup.string().required("Metin Boş Bırakılamaz"),
})