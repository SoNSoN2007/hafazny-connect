
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.8b80e9fbd60945d29ac595d91acd19b1',
  appName: 'hafazny-connect',
  webDir: 'dist',
  server: {
    url: 'https://8b80e9fb-d609-45d2-9ac5-95d91acd19b1.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#ffffff",
      showSpinner: true,
      spinnerColor: "#000000"
    }
  }
};

export default config;
