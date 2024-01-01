"use client"

import { useRouter } from 'next/router';

function OtpVarifyPage() {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <div>
      <p>User ID: {userId}</p>
   
    </div>
  );
}

export default OtpVarifyPage;

