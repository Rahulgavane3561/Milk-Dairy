"use client"

import 'tailwindcss/tailwind.css';

import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="mainImage">
        <div className="content">
          <h1>Welcome to the Main Page</h1>
       
        </div>
      </main>

      <style jsx>{`
  .mainImage {
    background-image: url('/backa.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh; 
    object-fit: none;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden; 
    opacity: 1;
  }
  .content {
    color: white; 
 
  }
`}</style>

    </>
  );
}
