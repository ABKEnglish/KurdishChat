
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

const ProfilePhoto = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // Default Kurdistan flag colors for the avatar
  const kurdistanFlag = (
    <div className="w-full h-full flex flex-col">
      <div className="h-1/3 bg-red-600"></div>
      <div className="h-1/3 bg-white flex justify-center items-center">
        <div className="w-6 h-6 rounded-full bg-yellow-400"></div>
      </div>
      <div className="h-1/3 bg-green-600"></div>
    </div>
  );

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Photo should be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
        toast({
          title: "Photo updated",
          description: "Your profile photo has been updated successfully",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-gray-800">{t('app.title')}</h2>
        <p className="text-xs text-gray-500">{t('app.tagline')}</p>
      </div>
      
      <div 
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={triggerFileInput}
      >
        <Avatar className="h-24 w-24 border-2 border-white shadow-md">
          {photo ? (
            <AvatarImage src={photo} alt="Profile" />
          ) : (
            <AvatarFallback className="p-0 overflow-hidden">
              {kurdistanFlag}
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className={`absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center transition-opacity duration-200 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}>
          <Camera className="h-8 w-8 text-white" />
        </div>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handlePhotoChange}
      />
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="mt-2 text-sm text-gray-600"
        onClick={triggerFileInput}
      >
        {photo ? t('profile.changePhoto') : t('profile.addPhoto')}
      </Button>
    </div>
  );
};

export default ProfilePhoto;
