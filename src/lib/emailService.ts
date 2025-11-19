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

  // Debug logging
  console.log('EmailJS Config Check:', {
    serviceId: serviceId ? '✓' : '✗',
    templateId: templateId ? '✓' : '✗',
    publicKey: publicKey ? '✓' : '✗',
    allEnvVars: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_EMAILJS'))
  })

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      'EmailJS is not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file.'
    )
  }

  // Prepare email template parameters
  // Only include variables that are actually used in the EmailJS template
  // EmailJS will throw 412 if we send variables not in the template
  const templateParams = {
    name: data.name,
    email: data.email,
    club_name: data.clubName,
    university: data.university,
    role: data.role,
    org_type: formatOrgType(data.orgType),
    submission_date: new Date().toLocaleString(),
  }

  console.log('Sending email with params:', {
    serviceId,
    templateId,
    recipientEmail,
    templateParams: { ...templateParams, publicKey: '***hidden***' }
  })

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)
    console.log('EmailJS success:', response)
  } catch (error: any) {
    console.error('EmailJS error details:', {
      error,
      status: error?.status,
      text: error?.text,
      message: error?.message,
      serviceId,
      templateId
    })
    
    // Provide more helpful error messages
    if (error?.status === 412) {
      throw new Error(
        'Email template mismatch. Please check that your EmailJS template includes all these variables: name, email, club_name, university, role, org_type, submission_date. Also ensure the recipient email is configured in your EmailJS service settings.'
      )
    }
    
    throw new Error(error?.text || error?.message || 'Failed to send email. Please try again.')
  }
}

