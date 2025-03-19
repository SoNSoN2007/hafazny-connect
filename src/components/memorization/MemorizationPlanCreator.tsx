
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { surahs } from '@/lib/quranData'; // Fix 'Surahs' to 'surahs'
import { useAuth } from '@/context/AuthContext';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Plan name must be at least 3 characters' }),
  goal: z.enum(['full_quran', 'juz_amma', 'selected_surahs'], {
    required_error: 'Please select a memorization goal',
  }),
  dailyTime: z.number().min(5, { message: 'Daily time must be at least 5 minutes' }).max(180),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced'], {
    required_error: 'Please select a difficulty level',
  }),
  selectedSurahs: z.array(z.number()).optional(),
  reciterId: z.string(),
  reminders: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const MemorizationPlanCreator: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<'full_quran' | 'juz_amma' | 'selected_surahs'>('juz_amma');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      goal: 'juz_amma',
      dailyTime: 20,
      difficulty: 'beginner',
      selectedSurahs: [],
      reciterId: 'mishary',
      reminders: true,
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("Creating memorization plan:", values);
    
    // In a real app, this would send the plan to an API
    toast({
      title: "Memorization Plan Created!",
      description: "Your personalized memorization plan has been created.",
    });
    
    navigate('/dashboard');
  };

  const nextStep = () => {
    const currentFields = step === 1 
      ? ['name', 'goal'] 
      : step === 2 
        ? ['dailyTime', 'difficulty'] 
        : ['reciterId'];
    
    const isValid = currentFields.every(field => {
      const result = form.trigger(field as any);
      return result;
    });

    if (isValid) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  // Update selectedGoal when form value changes
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'goal' && value.goal) {
        setSelectedGoal(value.goal as any);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, form.watch]);

  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Create a Memorization Plan</CardTitle>
          <CardDescription>
            Design a personalized plan to help you memorize the Quran
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6">
          <p className="text-gray-600 mb-4">
            You need to be logged in to create a memorization plan.
          </p>
          <Button onClick={() => navigate('/auth/login')}>
            Sign In to Continue
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create Your Memorization Plan</CardTitle>
        <CardDescription>
          {step === 1 && "Set your memorization goals"}
          {step === 2 && "Choose your learning preferences"}
          {step === 3 && "Select surahs and customize your plan"}
          {step === 4 && "Review and confirm your plan"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My Memorization Journey" {...field} />
                      </FormControl>
                      <FormDescription>
                        Give your memorization plan a name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Memorization Goal</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="full_quran" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Complete Quran (114 Surahs)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="juz_amma" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Juz Amma (30th Part)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="selected_surahs" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Selected Surahs
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="dailyTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Daily Study Time (minutes): {field.value}</FormLabel>
                      <FormControl>
                        <Slider
                          min={5}
                          max={180}
                          step={5}
                          defaultValue={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                      </FormControl>
                      <FormDescription>
                        How much time can you dedicate each day?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner - Slower pace with more repetition</SelectItem>
                          <SelectItem value="intermediate">Intermediate - Balanced pace</SelectItem>
                          <SelectItem value="advanced">Advanced - Faster pace for experienced memorizers</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose a difficulty that matches your experience level
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reciterId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Reciter</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select reciter" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mishary">Mishary Rashid Alafasy</SelectItem>
                          <SelectItem value="sudais">Abdurrahman As-Sudais</SelectItem>
                          <SelectItem value="abdulbasit">Abdul Basit Abdul Samad</SelectItem>
                          <SelectItem value="shuraim">Saud Al-Shuraim</SelectItem>
                          <SelectItem value="alghamdi">Saad Al-Ghamdi</SelectItem>
                          <SelectItem value="dosari">Yasser Al-Dosari</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select your preferred reciter for audio recitation
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 3 && selectedGoal === 'selected_surahs' && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="selectedSurahs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Surahs to Memorize</FormLabel>
                      <div className="h-60 overflow-y-auto border rounded-md p-4">
                        <div className="space-y-2">
                          {surahs.map((surah) => (
                            <div key={surah.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`surah-${surah.id}`}
                                checked={field.value?.includes(surah.id)}
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || [];
                                  if (checked) {
                                    field.onChange([...currentValue, surah.id]);
                                  } else {
                                    field.onChange(currentValue.filter(id => id !== surah.id));
                                  }
                                }}
                              />
                              <label
                                htmlFor={`surah-${surah.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {surah.id}. {surah.name} - {surah.arabicName} ({surah.verses} verses)
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <FormDescription>
                        Choose the surahs you want to include in your memorization plan
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 3 && selectedGoal !== 'selected_surahs' && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">
                    {selectedGoal === 'full_quran' ? 'Full Quran Memorization' : 'Juz Amma Memorization'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {selectedGoal === 'full_quran'
                      ? 'Your plan will include all 114 surahs of the Quran organized in an optimal sequence.'
                      : 'Your plan will focus on the 30th part of the Quran (Juz Amma), which contains short surahs ideal for beginners.'}
                  </p>
                  <div className="text-sm">
                    <p className="font-medium mb-1">Estimated completion time:</p>
                    <p className="text-gray-600">
                      {selectedGoal === 'full_quran'
                        ? form.getValues('difficulty') === 'beginner' 
                          ? '3-4 years' 
                          : form.getValues('difficulty') === 'intermediate'
                            ? '2-3 years'
                            : '1-2 years'
                        : form.getValues('difficulty') === 'beginner'
                          ? '6-8 months'
                          : form.getValues('difficulty') === 'intermediate'
                            ? '4-6 months'
                            : '2-3 months'}
                    </p>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="reminders"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Enable daily reminders
                        </FormLabel>
                        <FormDescription>
                          Receive daily notifications to help you stay on track
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Plan Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan Name:</span>
                      <span className="font-medium">{form.getValues('name')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Goal:</span>
                      <span className="font-medium">
                        {form.getValues('goal') === 'full_quran' 
                          ? 'Complete Quran' 
                          : form.getValues('goal') === 'juz_amma'
                            ? 'Juz Amma (30th Part)'
                            : 'Selected Surahs'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daily Study Time:</span>
                      <span className="font-medium">{form.getValues('dailyTime')} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Difficulty:</span>
                      <span className="font-medium capitalize">{form.getValues('difficulty')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Preferred Reciter:</span>
                      <span className="font-medium">
                        {form.getValues('reciterId') === 'mishary' 
                          ? 'Mishary Rashid Alafasy' 
                          : form.getValues('reciterId') === 'sudais'
                            ? 'Abdurrahman As-Sudais'
                            : form.getValues('reciterId') === 'abdulbasit'
                              ? 'Abdul Basit Abdul Samad'
                              : form.getValues('reciterId') === 'shuraim'
                                ? 'Saud Al-Shuraim'
                                : form.getValues('reciterId') === 'alghamdi'
                                  ? 'Saad Al-Ghamdi'
                                  : 'Yasser Al-Dosari'}
                      </span>
                    </div>
                    {form.getValues('goal') === 'selected_surahs' && (
                      <div>
                        <span className="text-gray-600 block mb-2">Selected Surahs:</span>
                        <div className="text-sm bg-white dark:bg-gray-700 p-2 rounded max-h-24 overflow-y-auto">
                          {form.getValues('selectedSurahs')?.map(id => {
                            const surah = surahs.find(s => s.id === id);
                            return surah ? (
                              <div key={id} className="mb-1">
                                {surah.id}. {surah.name} ({surah.verses} verses)
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={previousStep}>
            Back
          </Button>
        )}
        {step < 4 ? (
          <Button onClick={nextStep}>
            Continue
          </Button>
        ) : (
          <Button onClick={form.handleSubmit(onSubmit)}>
            Create Plan
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MemorizationPlanCreator;
