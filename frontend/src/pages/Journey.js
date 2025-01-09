import React from 'react';
import ProfileBar from '../components/ProfileBar';
import MyJourney from '../components/MyJourney';
import BackToTop from '../components/BackToTop';

const Journey = () => {
  return (
    <main className="relative w-full min-h-screen h-full p-[2%] bg-smoky-black gap-10">
      <ProfileBar />
      <MyJourney />
      <BackToTop targetId={"top"} />
    </main>
  );
}

export default Journey;
