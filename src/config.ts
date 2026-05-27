import { AppConfigurationClient } from "@azure/app-configuration";
import dotenv from "dotenv";
dotenv.config();
const app_config_string:string|undefined=process.env.AZURE_APP_CONFIG_CONNECTION_STRING
if(!app_config_string){
throw new Error("AZURE_APP_CONFIG_CONNECTION_STRING is not defined")
}
const appConfigClient =new AppConfigurationClient(String(app_config_string));

export const getConfigObject = async (): Promise<Record<string, any>> => {

  const settingsIterator = appConfigClient.listConfigurationSettings();
  

  const config: Record<string, any> = {};

  for await (const setting of settingsIterator) {
    if (!setting.key || setting.value === undefined) continue;

    const keys = setting.key.split(":");
    let current = config;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!key) continue;

      if (i === keys.length - 1) {
        current[key] = setting.value;
      } else {
        current[key] = current[key] || {};
        current = current[key];
      }
    }
  }

 
  return config;
};

// const getconfiglist=async()=>{
//     try{
//         let configlist= await appConfigClient.listConfigurationSettings();
//         console.log(configlist);
//     }catch(error){
//         throw new Error(`Cannot get configuration Setting: ${error}`)
//     }
// }
// export default getconfiglist; 
