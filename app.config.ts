import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): Partial<ExpoConfig> => ({
  ...config,
  extra: { API_ROOT: "http://localhost:5000/api/" },
});
