import { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  return {
    ...config,
    extra: {
      API_ROOT: "http://localhost:5000/api/",
      API_ROOT_ANDROID: "http://10.0.2.2:5000/api/",
    },
  };
};
