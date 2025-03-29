import React from 'react'

import SignUpform from '@/components/signupform'


const SignupPage = () => {
  return (
    <div className="flex w-full items-center justify-center mt-16 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpform/>
      </div>
    </div>
  )
}

export default SignupPage