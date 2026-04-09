import { ref, reactive } from 'vue'
import { z } from 'zod'
import { toast } from 'vue-sonner'
import type { Product, OrderFormData } from '../types'

const orderSchema = z.object({
  customerName: z.string()
    .refine(
      (val) => val.trim().split(/\s+/).filter(Boolean).length >= 2,
      'Введите минимум имя и фамилию'
    )
    .refine(
      (val) => val.trim().split(/\s+/).filter(Boolean).every(p => /^[а-яёА-ЯЁa-zA-Z-]{2,}$/.test(p)),
      'Используйте только буквы (например: Иванов Иван)'
    ),

  customerPhone: z.string()
    .refine(
      (val) => val.replace(/\D/g, '').length >= 11,
      'Введите полный номер телефона'
    ),
})

export function useOrderForm(onSuccess?: () => void) {
  const formState = reactive({ customerName: '', customerPhone: '' })
  const errors = reactive<Record<string, string>>({})
  const isSubmitting = ref(false)

  const resetForm = () => {
    formState.customerName = ''
    formState.customerPhone = ''
    Object.keys(errors).forEach(key => delete errors[key])
  }

  const submit = async (product: Product | null) => {
    if (!product) return

    Object.keys(errors).forEach(key => delete errors[key])

    const validation = orderSchema.safeParse(formState)
    if (!validation.success) {
      validation.error.issues.forEach(issue => {
        const field = String(issue.path[0])
        if (!errors[field]) errors[field] = issue.message
      })
      return
    }

    isSubmitting.value = true

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const finalData: OrderFormData = {
        productId: product.ID,
        productName: product.NAME,
        customerName: formState.customerName,
        customerPhone: formState.customerPhone,
      }

      console.log('[Order Submitted]', finalData)
      
      toast.success('Заказ оформлен!', {
        description: `Менеджер свяжется с вами по номеру ${finalData.customerPhone}`
      })

      resetForm()
      onSuccess?.()
    } catch {
      toast.error('Ошибка при оформлении заказа', {
        description: 'Попробуйте повторить позже'
      })
    } finally {
      isSubmitting.value = false
    }
  }

  return { formState, errors, isSubmitting, submit, resetForm }
}
