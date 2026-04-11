import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function FAQRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/chatbot')
  }, [])

  return null
}
