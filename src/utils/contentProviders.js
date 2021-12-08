// @flow1

export function getAppName(): string {
  return 'merarozgaar';
}

type InputType =
  | 'email'
  | 'phoneNumber'
  | 'otp'
  | 'date'
  | 'password'
  | 'confirmPassword';

export function getErrorMessage(
  type: ?string = 'required',
  inputName: ?InputType,
): string {
  const genericMessage = 'This input is invalid.';

  switch (type) {
    case 'required':
      return 'This input is required.';

    case 'error': {
      const messages = {
        email: 'This is an invalid email.',
        phoneNumber: 'This is an invalid mobile number.',
        otp: 'This is an invalid OTP.',
        date: 'This is an invalid date.',
        password: 'Password must contain 8 characters.',
        // password:
        // 'Password must contain 8 characters including at least 1 uppercase, 1 lowercase, 1 digit and 1 special character.',
        confirmPassword: 'Password and Confirm Password must match.',
      };

      return inputName ? messages[inputName] : genericMessage;
    }

    default:
      return genericMessage;
  }
}

export function getAppRoutes(): {
  home: string,
  auth: string,
  signIn: string,
  signUp: string,
  onboarding: string,
  candidateDetails: string,
  apply: string,
  createJob: string,
  jobs: string,
  jobDetails: string,
  applications: string,
  search: string,
  categories: string,
} {
  return {
    home: '/',
    auth: '/auth',
    signIn: '/auth/login',
    signUp: '/auth/register',
    onboarding: '/auth/onboarding',
    candidateDetails: '/candidates/:id',
    apply: '/candidates/:id/apply',
    createJob: '/new-job',
    jobs: '/jobs',
    jobDetails: '/jobs/:id',
    applications: '/jobs/:id/applications',
    search: '/search/:professionID',
    categories: '/categories',
  };
}

export function getCollections(): {
  users: string,
  donors: string,
  patients: string,
  vaccinationCenters: string,
  vaccinationInterested: string,
  vaccinationConsents: string,
  vaccinationUsers: string,
  vaccinationFeedback: string,
  driverRegistration: string,
  mediaRegistration: string,
  lgtbiq: string,
  // eslint-disable-next-line indent
} {
  return {
    users: 'users-v2',
    donors: 'donors-v2',
    patients: 'patients-v2',
    vaccinationCenters: 'vaccinationCenters-v2',
    vaccinationInterested: 'vaccinationInterested-v2',
    vaccinationConsents: 'vaccinationConsents-v9',
    vaccinationUsers: 'vaccinationUsers-v2',
    vaccinationFeedback: 'vaccinationFeedback',
    driverRegistration: 'driverRegistration',
    mediaRegistration: 'mediaRegistration',
    lgtbiq: 'lgtbiq',
  };
}

export const months: Array<string> = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const dropdownOptionsMapper =
  (uppercase = true) =>
  (c: string): { value: string, label: string } => ({
    value: uppercase ? c.toUpperCase() : c,
    label: c,
  });

export const genders: Array<{ value: string, label: string }> = [
  'Male',
  'Female',
  'Transgender',
].map(dropdownOptionsMapper(true));

export const maritalStatus: Array<{ value: string, label: string }> = [
  'Single',
  'Married',
  'Widowed',
  'Separated',
  'Divorced',
]
  .sort()
  .map(dropdownOptionsMapper(true));

export const bloodGroups: Array<{ value: string, label: string }> = [
  'A',
  'B',
  'O',
  'AB',
]
  .map((c) => [`${c}+`, `${c}-`])
  .reduce((a, c) => [...a, ...c], [])
  .map(dropdownOptionsMapper(false));

export const states: Array<{ value: string, label: string }> = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttarakhand',
  'Uttar Pradesh',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli',
  'Daman and Diu',
  'Delhi',
  'Lakshadweep',
  'Puducherry',
]
  .sort()
  .map(dropdownOptionsMapper(false));

export const idProofOptions: Array<{ value: string, label: string }> = [
  'Aadhaar Card',
  'Driving License',
  'PAN Card',
  'Passport',
  'Pension Passbook',
].map(dropdownOptionsMapper(true));

export const highestRadius: string = '5000';

declare var process: Object;

export const getStorageUrl = (imageSrc: string): string => {
  return `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}/o/${imageSrc}?alt=media`;
};

export const geolocationRadii: Array<{ value: string, label: string }> = [
  {
    label: '<50 Kms',
    value: '50',
  },
  {
    label: '<100 Kms',
    value: '100',
  },
  {
    label: '<250 Kms',
    value: '200',
  },
  {
    label: 'More than 250 Kms',
    value: highestRadius,
  },
];

export const vaccinationCenterID: string = 'sVlB9FJgZWT7cJVezE9D';

export function getAppContent(): Object {
  return {
    HINDI: {
      dropdown: 'एक विकल्प चुनें',
      inputNames: {
        name: 'नाम',
        mobileNumber: 'मोबाइल नंबर',
        dob: 'जनम तिथि',
        gender: 'लिंग',
        address: 'पता',
        email: 'ईमेल',
        avatar: 'प्रोफ़ाइल चित्र अपलोड करें',
        profession: 'पेशा',
        industry: 'उद्योग',
        education: 'शिक्षा',
        experience: 'कार्य अनुभव',
      },
      setup: {
        intro: 'खोजें एक आदर्श रोज़गार',
        tagline: 'पाएं अपने सपनों की नौकरी मेरा रोज़गार ऐप के साथ',
        primaryCTA: 'शुरू करें',
        colophon: 'SIGMA द्वारा संचालित',
        madeInIndia: 'भारत में बना',
        optionsHeading: 'आप क्या ढूंढ रहे हैं?',
        optionsLabel: 'जारी रखने के लिए एक विकल्प चुनें',
        employeeCTA: 'नौकरी ढूंढो',
        employerCTA: 'भर्ती शुरू करें',
      },
      languages: {
        title: 'भाषा चुनें / Select language',
      },
      signUp: {
        heading: 'साइन अप करें',
        subheading: 'जारी रखने के लिए नीचे अपनी जानकारी दर्ज करें',
        getStarted: 'शुरू करें',
        // disclaimer: (theme) => (
        //   <Caption
        //     style={{ color: theme.colors.placeholder, letterSpacing: 0 }}>
        //     <Caption style={{ color: theme.colors.text, letterSpacing: 0 }}>
        //       शुरू करें
        //     </Caption>{' '}
        //     पर क्लिक करके, आप हमारे{' '}
        //     <Caption style={{ color: theme.colors.primary, letterSpacing: 0 }}>
        //       नियम, शर्तों
        //     </Caption>{' '}
        //     व{' '}
        //     <Caption style={{ color: theme.colors.primary, letterSpacing: 0 }}>
        //       प्राइवेसी पॉलिसी
        //     </Caption>{' '}
        //     से सहमत होते हैंI .
        //   </Caption>
        // ),
        alreadyRegistered: 'क्या आप पहले से रजिस्टर्ड है?',
        login: 'लॉगिन करें',
        asGuest: 'अतिथि के रूप में जारी रखें',
      },
      login: {
        heading: 'लॉगिन करें',
        subheading: 'हम आपको इस मोबाइल नंबर पर 6 अंकों का ओटीपी भेजेंगे।',
        requestOtp: 'रिक्वेस्ट ओटीपी',
        noAccount: 'क्या आपका अकाउंट नहीं है?',
        register: 'रजिस्टर करें',
        asGuest: 'अतिथि के रूप में जारी रखें',
      },
      courses: {
        congratulations: 'बधाई हो!',
        stars: 'आपके द्वारा एकत्र किए गए सितारे',
        disclaimerSuccess: (
          <>
            एक बार जब आप 6 स्टार जमा कर लेते हैं, तो आपकी प्रोफ़ाइल पर{'\n'}एक
            बैज दिखाई देगा।
          </>
        ),
        continue: 'अगले वीडियो के लिए जारी रखें',
        oops: 'उफ़',
        betterLuck: 'अगली बार किस्मत तुम्हारा साथ देगी!',
        disclaimerFailure: 'पास होने के लिए आपको कम से कम 50% अंक लाने होंगे।',
        retry: 'पुन: प्रयास करें',
      },
      editProfile: {
        appbarTitle: 'अपनी प्रोफाइल पूरी करें',
        steps: (step) => `स्टेप ${step}/3`,
        format: 'अनुमत प्रारूप .jpeg, .jpg या .png हैं।',
        save: 'सेव',
      },
    },
    ENGLISH: {
      dropdown: 'Choose an option',
      inputNames: {
        name: 'Name',
        mobileNumber: 'Mobile Number',
        dob: 'Date of Birth',
        gender: 'Gender',
        address: 'Address',
        email: 'Email',
        avatar: 'Upload profile picture',
        profession: 'Profession',
        industry: 'Industry',
        education: 'Education',
        experience: 'Experience',
      },
      setup: {
        intro: <>Find a Perfect{'\n'}Job Match.</>,
        tagline: <>Find your dream job with Mera Rozgaar app</>,
        primaryCTA: "Let's get started",
        colophon: 'Powered by SIGMA',
        madeInIndia: 'Made in India',
        optionsHeading: 'What are you looking for?',
        optionsLabel: 'Select an option to continue',
        employeeCTA: 'Find a job',
        employerCTA: 'Start hiring',
      },
      languages: {
        title: 'भाषा चुनें / Select language',
      },
      signUp: {
        heading: 'Sign up',
        subheading: 'Enter your information below to continue.',
        getStarted: 'Get started',
        // disclaimer: (theme) => (
        //   <Caption
        //     style={{ color: theme.colors.placeholder, letterSpacing: 0 }}>
        //     By clicking{' '}
        //     <Caption style={{ color: theme.colors.text, letterSpacing: 0 }}>
        //       Get started
        //     </Caption>
        //     , you agree to our{' '}
        //     <Caption style={{ color: theme.colors.primary, letterSpacing: 0 }}>
        //       Terms & Conditions
        //     </Caption>
        //     {'\n'}
        //     and{' '}
        //     <Caption style={{ color: theme.colors.primary, letterSpacing: 0 }}>
        //       Privacy Policy
        //     </Caption>
        //     .
        //   </Caption>
        // ),
        alreadyRegistered: 'Already registered?',
        login: 'Login now',
        asGuest: 'Continue as Guest',
      },
      login: {
        heading: 'Login to continue',
        subheading: 'We will send you a 6 digit OTP on this mobile number.',
        requestOtp: 'Request OTP',
        noAccount: "Don't have an account?",
        register: 'Register now',
        asGuest: 'Continue as Guest',
      },
      courses: {
        congratulations: 'Congratulations!',
        stars: "Stars you've collected",
        disclaimerSuccess: (
          <>
            Once you collect 6 stars, a badge will appear{'\n'}on your profile.
          </>
        ),
        continue: 'Continue to next video',
        oops: 'Oops!',
        betterLuck: 'Better luck next time!',
        disclaimerFailure: 'You need to score a minimum of 50% to pass.',
        retry: 'Try again',
      },
      editProfile: {
        appbarTitle: 'Complete your profile',
        steps: (s) => `Step ${s}/3`,
        format: 'Allowed formats are .jpeg, .jpg or .png.',
        save: 'Save',
      },
    },
  };
}
