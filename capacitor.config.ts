import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Tarea_8',
  webDir: 'www',
  "bundledWebRuntime": false,
  "plugins": {
    "MediaCapture": {
      "enabled": true
    }
  }
};

export default config;
