// components/PageContent.js
"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

function Profile() {
  const router = useRouter();

  let content = null;

  switch (router.pathname) {
    case '/profile':
      content = <div>Profile content goes here</div>;
      break;
    case '/orders':
      content = <div>Orders content goes here</div>;
      break;
    case '/history':
      content = <div>History content goes here</div>;
      break;
    default:
      content = <div>Default content or not found page</div>;
      break;
  }

  return <div className="page-content">{content}</div>;
}

export default Profile;
