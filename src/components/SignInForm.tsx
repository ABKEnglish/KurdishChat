
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type SignInFormValues = z.infer<typeof signInSchema>;

interface SignInFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSuccess, onCancel }) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInFormValues) => {
    console.log('Sign in attempt:', data);
    
    // In a real app, this would connect to a backend authentication service
    // This is just a simulation for the demo
    setTimeout(() => {
      toast({
        title: "Signed in successfully!",
        description: `Welcome back, ${data.email}!`,
      });
      
      if (onSuccess) {
        onSuccess();
      }
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    // In a real app, this would initiate Google OAuth flow
    // This is just a simulation for the demo
    console.log('Initiating Google sign in');
    
    setTimeout(() => {
      toast({
        title: "Google sign in successful!",
        description: "Welcome back to KurdishChat!",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-md space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">{t('auth.signin')}</h2>
        <p className="text-sm text-gray-600 mt-1">{t('auth.welcome')}</p>
      </div>

      <div className="flex flex-col space-y-4">
        <Button 
          type="button" 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
          onClick={handleGoogleSignIn}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          {t('auth.googleSignIn')}
        </Button>
        
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative px-4 bg-white text-sm text-gray-500">
            OR
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.email')}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.password')}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center">
            <Link to="#" className="text-sm text-blue-600 hover:underline">
              {t('auth.forgotPassword')}
            </Link>
          </div>

          <div className="flex justify-between gap-4 pt-2">
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                className="w-full" 
                onClick={onCancel}
              >
                {t('auth.cancel')}
              </Button>
            )}
            <Button type="submit" className="w-full">
              {t('auth.signin')}
            </Button>
          </div>
        </form>
      </Form>

      <div className="text-center text-sm text-gray-600 mt-4">
        {t('auth.dontHaveAccount')} <Link to="/signup" className="text-blue-600 hover:underline">{t('auth.signup')}</Link>
      </div>
    </div>
  );
};

export default SignInForm;
