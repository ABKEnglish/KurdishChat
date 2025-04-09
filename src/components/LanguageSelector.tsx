
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Languages } from 'lucide-react';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Select
      value={language}
      onValueChange={(value) => setLanguage(value as 'en' | 'ku')}
    >
      <SelectTrigger className="w-[110px]">
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4" />
          <SelectValue placeholder="Language" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="ku">کوردی</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
