import React from 'react';
import ProfileBar from '../components/ProfileBar';
import MyContact from '../components/MyContact';
import BackToTop from '../components/BackToTop';

const Contact = () => {
  return (
    <main className="relative w-full min-h-screen h-full p-[2%] bg-smoky-black gap-10">
      <ProfileBar />
      <MyContact />
      <BackToTop targetId={"top"} />
    </main>
  );
}

export default Contact;
