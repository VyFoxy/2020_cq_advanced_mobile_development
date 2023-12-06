import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const data = {
    user: {
      id: 'f569c202-7bbf-4620-af77-ecc1419a6b28',
      email: 'student@lettutor.com',
      name: 'Hai Pham',
      avatar:
        'https://sandbox.api.lettutor.com/avatar/f569c202-7bbf-4620-af77-ecc1419a6b28avatar1701448561575.jpeg',
      country: 'VN',
      phone: '842499996508',
      roles: ['student', 'CHANGE_PASSWORD'],
      language: 'Albanian',
      birthday: '2002-01-31',
      isActivated: true,
      tutorInfo: {
        id: 'db37f185-399f-470d-995b-bf6143cb1a5f',
        video:
          'https://sandbox.api.lettutor.com/video/f569c202-7bbf-4620-af77-ecc1419a6b28video1643096811438.mp4',
        bio: "You can't Xi me ! Bing chilling ! 1",
        education: 'University of Science 3',
        experience: '3 years',
        profession: 'WWE, Online English teacher',
        accent: null,
        targetStudent: 'Advanced',
        interests: 'I like reading book',
        languages: '+1268',
        specialties:
          'conversational-english,movers,flyers,toefl,toeic,business-english,Business English,Conversational English,Ielts,Movers,Toeic',
        resume: null,
        rating: 3.7401960784313726,
        isActivated: false,
        isNative: false,
        youtubeVideoId: null
      },
      walletInfo: {
        amount: '960700000',
        isBlocked: false,
        bonus: 0
      },
      requireNote: 'monday, tuesday',
      level: 'UPPER_INTERMEDIATE',
      learnTopics: [
        {
          id: 3,
          key: 'english-for-kids',
          name: 'English for Kids'
        },
        {
          id: 4,
          key: 'business-english',
          name: 'Business English'
        },
        {
          id: 5,
          key: 'conversational-english',
          name: 'Conversational English'
        }
      ],
      testPreparations: [
        {
          id: 4,
          key: 'ket',
          name: 'KET'
        },
        {
          id: 7,
          key: 'toefl',
          name: 'TOEFL'
        },
        {
          id: 8,
          key: 'toeic',
          name: 'TOEIC'
        },
        {
          id: 1,
          key: 'starters',
          name: 'STARTERS'
        },
        {
          id: 2,
          key: 'movers',
          name: 'MOVERS'
        },
        {
          id: 3,
          key: 'flyers',
          name: 'FLYERS'
        },
        {
          id: 5,
          key: 'pet',
          name: 'PET'
        },
        {
          id: 6,
          key: 'ielts',
          name: 'IELTS'
        }
      ],
      isPhoneActivated: true,
      timezone: 7,
      referralInfo: {
        referralCode: 'RSJYDZYQLE',
        referralPackInfo: {
          earnPercent: 5
        }
      },
      studySchedule: 'hello\n',
      canSendMessage: false,
      studentGroup: null,
      studentInfo: null,
      avgRating: 3.7401960784313726
    }
  };
  const login = (user) => {
    console.log(username);
    setUsername(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUsername('');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
