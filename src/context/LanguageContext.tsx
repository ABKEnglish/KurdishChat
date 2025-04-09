
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ku';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // General
    'app.title': 'Kurdistan Chat',
    'app.tagline': 'Connect with Kurdish speakers worldwide',
    
    // Auth
    'auth.signin': 'Sign In',
    'auth.signup': 'Sign Up',
    'auth.welcome': 'Welcome back to Kurdistan Chat',
    'auth.join': 'Join Kurdistan Chat and start connecting',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.fullName': 'Full Name',
    'auth.forgotPassword': 'Forgot password?',
    'auth.googleSignIn': 'Sign in with Google',
    'auth.googleSignUp': 'Sign up with Google',
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.dontHaveAccount': 'Don\'t have an account yet?',
    'auth.createAccount': 'Create Account',
    'auth.cancel': 'Cancel',
    
    // Profile Photo
    'profile.addPhoto': 'Add profile photo',
    'profile.changePhoto': 'Change photo',
    
    // Chat
    'chat.searchContacts': 'Search contacts...',
    'chat.typeMessage': 'Type a message...',
    'chat.selectContact': 'Select a contact to start chatting',
  },
  ku: {
    // General
    'app.title': 'چاتی کوردستان',
    'app.tagline': 'پەیوەندی لەگەڵ کوردزمانەکان لە سەرانسەری جیهان',
    
    // Auth
    'auth.signin': 'چوونە ژوورەوە',
    'auth.signup': 'خۆتۆمارکردن',
    'auth.welcome': 'بەخێربێیتەوە بۆ چاتی کوردستان',
    'auth.join': 'بەشداربە لە چاتی کوردستان و دەست بکە بە پەیوەندی',
    'auth.email': 'ئیمەیل',
    'auth.password': 'وشەی نهێنی',
    'auth.confirmPassword': 'دڵنیاکردنەوەی وشەی نهێنی',
    'auth.fullName': 'ناوی تەواو',
    'auth.forgotPassword': 'وشەی نهێنیت لەبیرچووە؟',
    'auth.googleSignIn': 'چوونە ژوورەوە بە گووگڵ',
    'auth.googleSignUp': 'خۆتۆمارکردن بە گووگڵ',
    'auth.alreadyHaveAccount': 'پێشتر هەژمارت هەیە؟',
    'auth.dontHaveAccount': 'هێشتا هەژمارت نیە؟',
    'auth.createAccount': 'دروستکردنی هەژمار',
    'auth.cancel': 'هەڵوەشاندنەوە',
    
    // Profile Photo
    'profile.addPhoto': 'زیادکردنی وێنەی پرۆفایل',
    'profile.changePhoto': 'گۆڕینی وێنە',
    
    // Chat
    'chat.searchContacts': 'گەڕان بۆ پەیوەندییەکان...',
    'chat.typeMessage': 'پەیامێک بنووسە...',
    'chat.selectContact': 'پەیوەندییەک هەڵبژێرە بۆ دەستپێکردنی چات',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
