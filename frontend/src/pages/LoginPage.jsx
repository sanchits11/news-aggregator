import React from 'react'

import Loginform from '@/components/loginform'

const LoginPage = () => {
  return (
    <div className="flex mt-16 w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Loginform/>
      </div>
    </div>
  )
}

export default LoginPage