import emailjs from '@emailjs/browser'

export interface WaitlistData {
  name: string
  email: string
  clubName: string
  university: string
  role: string
  orgType: string
}

export const formatOrgType = (orgType: string) => {
  const orgTypeMap: Record<string, string> = {
    'student-org': 'Student Organization',
    greek: 'Greek Chapter',
    sports: 'Sports Team',
    'student-gov': 'Student Government',
    national: 'National Organization',
    other: 'Other',
  }

  return orgTypeMap[orgType] || orgType
}

/**
 * Sends waitlist entry information to a specified email address using EmailJS
 */
export const sendWaitlistEmail = async (data: WaitlistData, recipientEmail: string) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      'EmailJS is not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file.'
    )
  }

  // Prepare email template parameters
  const templateParams = {
    to_email: recipientEmail,
    from_name: data.name,
    from_email: data.email,
    name: data.name,
    email: data.email,
    club_name: data.clubName,
    university: data.university,
    role: data.role,
    org_type: formatOrgType(data.orgType),
    submission_date: new Date().toLocaleString(),
  }

  try {
    await emailjs.send(serviceId, templateId, templateParams, publicKey)
  } catch (error) {
    console.error('EmailJS error:', error)
    throw new Error('Failed to send email. Please try again.')
  }
}

