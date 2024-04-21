import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Unrated',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CapacitorHttp: {
        "enabled": true
    }
  }
};

export default config;
