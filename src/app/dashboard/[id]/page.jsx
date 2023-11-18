"use client"
import { useContext, useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { Auth } from '@/app/hooks';

const page = ({ params }) => {
 

  const roomid = params.id;
  const myMeetingRef = useRef();

  useEffect(() => {
    const initializeMeeting = async () => {
      const appId = 830929227;
      const serverSecret = "bba3339163c626ad54ac2eb488e8dce0";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        appId,
        serverSecret,
        roomid,
        Date.now().toString(),
        "abhay"
      );

      const zc = ZegoUIKitPrebuilt.create(kitToken);
      const currentURL = window.location.href;
      zc.joinRoom({
        container: myMeetingRef.current,
        sharedLinks:[
            {
               name:'Copy Link',
               url:currentURL, 
            }
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
          
        },
      });
    };

    if (typeof window !== 'undefined') {
      // Run the code only on the client side
      initializeMeeting();
    }
  }, [roomid]);

  return <div ref={myMeetingRef}></div>;
};

export default page;
