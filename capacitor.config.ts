import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mu.mobile',
  appName: 'Mahindra University Connect',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.31.98:4000',
    cleartext: true
  },
  plugins: {
    Geolocation: {
      locationAlwaysAndWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.',
      locationAlwaysPermission: 'Allow $(PRODUCT_NAME) to use your location.',
      locationWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.',
    },
    GoogleMaps: {
      apiKey: process.env.VITE_GOOGLE_MAPS_API_KEY || '',
      androidApiKey: process.env.VITE_GOOGLE_MAPS_API_KEY || '',
      iosApiKey: process.env.VITE_GOOGLE_MAPS_API_KEY || ''
    }
  },
};

export default config;
