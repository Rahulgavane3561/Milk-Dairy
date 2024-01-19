"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

const Page = ({params,any}) => {
  const id=params.p_id;

  return (
    <div className='p-4'>
      <p>Page</p>
      <p>ID from URL: {id}</p>
    </div>
  );
}

export default Page;
