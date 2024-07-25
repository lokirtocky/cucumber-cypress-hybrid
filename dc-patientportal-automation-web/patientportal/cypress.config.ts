import { defineConfig } from "cypress";
import mssql from "mssql";
import fs from "fs";
import * as path from "path";
import { SecretClient } from "@azure/keyvault-secrets";
import { DefaultAzureCredential } from "@azure/identity";
import { AppConfigurationClient } from "@azure/app-configuration";
import EmailUtils from "../patientportal/cypress/support/utils/GmailUtils";
import allureWriter from "@shelex/cypress-allure-plugin/writer";
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsBuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

const defaultEnv = "stage";

interface DatabaseConfig {
  user: string;
  password: string;
  server: string;
  database: string;
  options: {
    encrypt: boolean;
    trustServerCertificate: boolean;
  };
}

interface EnvironmentConfig {
  env: string;
  url: string;
  email: string;
  memberId:string;
  firstName:string;
  lastName:string;
  user1: string;
  user2: string;
  user3: string;
  user4: string;
  password: string;
  automationPassword:string,
  redirectUrl: string;
  apiUrl: string;
  accessTokenUrl: string;
  appConfigConnectionString: string;
  keyVaultUrl: string;
  maxWaitForElementInSeconds: number;
  databases: string[];
  SMS_URL: string;
}

const environment = process.env.CYPRESS_ENV || defaultEnv;

function loadEnvironmentConfig(environment: string): EnvironmentConfig {
  const configPath = path.resolve(
    __dirname,
    `./cypress/support/env/${environment.trim()}.json`
  );
  console.log("config Path : " + configPath);
  try {
    if (!fs.existsSync(configPath)) {
      throw new Error(`Config file does not exist at path: ${configPath}`);
    }
    const envConfig: EnvironmentConfig = JSON.parse(
      fs.readFileSync(configPath, "utf-8")
    );
    const { appConfigConnectionString, keyVaultUrl, databases } = envConfig;
    if (!appConfigConnectionString || !keyVaultUrl) {
      throw new Error(
        "appConfigConnectionString and keyVaultUrl must be defined in the environment configuration."
      );
    }
    return { ...envConfig, appConfigConnectionString, keyVaultUrl, databases };
  } catch (error) {
    console.error(
      `Failed to load environment configuration from ${configPath}`,
      error
    );
    throw error;
  }
}

console.log("Environment is : " + environment);
const envConfig = loadEnvironmentConfig(environment);

const dbPools: { [key: string]: mssql.ConnectionPool } = {};
const tokenFilePath = path.resolve(
  __dirname,
  "./cypress/support/env/AccessToken.json"
);

async function connectToDatabase(
  dbConfig: DatabaseConfig
): Promise<mssql.ConnectionPool> {
  const poolKey = `${dbConfig.server}:${dbConfig.database}`;
  if (!dbPools[poolKey]) {
    const pool = new mssql.ConnectionPool(dbConfig);
    try {
      const connectedPool = await pool.connect();
      dbPools[poolKey] = connectedPool;
    } catch (error) {
      console.error("Database connection failed:", error);
      throw error;
    }
  }
  return dbPools[poolKey];
}

function saveToken(tokenData: any) {
  fs.writeFileSync(tokenFilePath, JSON.stringify(tokenData, null, 2));
}

function getToken() {
  if (fs.existsSync(tokenFilePath)) {
    return JSON.parse(fs.readFileSync(tokenFilePath, "utf-8"));
  }
  return null;
}

function removeToken() {
  if (fs.existsSync(tokenFilePath)) {
    fs.unlinkSync(tokenFilePath);
  }
}

if (!envConfig.appConfigConnectionString || !envConfig.keyVaultUrl) {
  throw new Error(
    "appConfigConnectionString and keyVaultUrl must be defined in the environment configuration."
  );
}

const appConfigClient = new AppConfigurationClient(
  envConfig.appConfigConnectionString
);
const credential = new DefaultAzureCredential();
const keyVaultClient = new SecretClient(envConfig.keyVaultUrl, credential);

export async function fetchAzureSettings(keys: string[]): Promise<void> {
  console.log("Connecting to Azure App Configuration...");
  try {
    await Promise.all(
      keys.map(async (key) => {
        try {
          await appConfigClient.getConfigurationSetting({ key });
        } catch (error) {
          if (isRestError(error) && error.statusCode === 404) {
            console.warn(`Configuration setting ${key} not found.`);
          } else {
            console.error(`Error fetching setting ${key}: ${error}`);
            throw error;
          }
        }
      })
    );
    console.log("Successfully connected to Azure App Configuration.");
  } catch (error) {
    console.error(`Failed to load environment configuration:`, error);
    throw error;
  }
}

async function getDatabaseConfig(secretName: string): Promise<DatabaseConfig> {
  const dbConnectionStringSecret = await keyVaultClient.getSecret(secretName);
  const dbConnectionString: string | undefined = dbConnectionStringSecret.value;
  console.log("Secret Value is : " + dbConnectionString);

  if (!dbConnectionString) {
    throw new Error(
      `Failed to retrieve connection string from Key Vault for ${secretName}`
    );
  }

  const serverRegex = /SERVER=([^;]+)/;
  const databaseRegex = /DATABASE=([^;]+)/;
  const uidRegex = /UID=([^;]+)/;
  const pwdRegex = /PWD=([^;]+)/;

  const serverMatch = dbConnectionString.match(serverRegex);
  const databaseMatch = dbConnectionString.match(databaseRegex);
  const uidMatch = dbConnectionString.match(uidRegex);
  const pwdMatch = dbConnectionString.match(pwdRegex);

  return {
    user: uidMatch ? uidMatch[1] : "",
    password: pwdMatch ? pwdMatch[1] : "",
    server: serverMatch ? serverMatch[1] : "",
    database: databaseMatch ? databaseMatch[1] : "",
    options: {
      encrypt: true,
      trustServerCertificate: false,
    },
  };
}

async function connectToAllDatabases() {
  const databases = envConfig.databases;
  for (const secretName of databases) {
    const dbConfig = await getDatabaseConfig(secretName);
    await connectToDatabase(dbConfig);
  }
}

function isRestError(error: unknown): error is RestError {
  return typeof error === "object" && error !== null && "statusCode" in error;
}

interface RestError {
  statusCode: number;
  message: string;
  [key: string]: any;
}

async function executeQuery(secretName: string, query: string): Promise<any> {
  try {
    const dbConfig = await getDatabaseConfig(secretName);
    const pool = await connectToDatabase(dbConfig);
    const result = await pool.request().query(query);
    console.log("Query executed successfully:", result);
    return result;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

export default defineConfig({
  projectId: "5i667r",
  reporter: "mocha-allure-reporter",
  reporterOptions: {
    reporterEnabled: "mochawesome, @shelex/cypress-allure-plugin",
    mochawesomeReporterOptions: {
      reportDir: "cypress/results",
      reportFilename: "DialcarePatientPortalReport.html",
      overwrite: true,
      html: true,
      json: true,
      timestamp: true,
      code: true,
      charts: true,
      quiet: true,
    },
    allurePluginOptions: {
      reportDir: "cypress/results/allure",
      disableWebdriverStepsReporting: false,
      disableWebdriverScreenshotsReporting: false,
      useCypressScreenshot: true,
    },
    env: {},
  },
  e2e: {
    async setupNodeEvents(on, config) {
      allureWriter(on, config);
      const bundler = createBundler({
        plugins: [createEsBuildPlugin(config)],
      });
      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);
      on("task", {
        log: (message: any) => {
          console.log(message);
          return null;
        },
        runQuery: async ({
          secretName,
          query,
        }: {
          query: string;
          secretName: string;
        }) => {
          console.log("Your Query is : " + query);
          console.log("Your Secret Name is : " + secretName);
          try {
            const result = await executeQuery(secretName, query);
            return result;
          } catch (error) {
            console.error("Error executing query:", error);
            throw error;
          }
        },
        getEmails: async ({
          userName,
          password,
          fromEmail,
          recipientEmail,
        }) => {
          const emailUtils = new EmailUtils(userName, password);
          try {
            await emailUtils.createImapSessionForGmail();
            const messages = await emailUtils.getLatestMessageFromTo(
              fromEmail,
              recipientEmail
            );
            return messages;
          } catch (err) {
            console.error("Email operation failed:", err);
            throw err;
          } finally {
            await emailUtils.close();
          }
        },
        saveAccessToken({ token, expiryTime }) {
          saveToken({
            token,
            expiryTime: new Date().getTime() + expiryTime * 1000,
          });
          return null;
        },
        getAccessToken() {
          const tokenData = getToken();
          if (tokenData && tokenData.expiryTime > Date.now()) {
            return tokenData.token;
          }
          removeToken();
          return null;
        },
      });
      config.env = { ...config.env, ...envConfig };
      config.defaultCommandTimeout =
        (envConfig.maxWaitForElementInSeconds || 45) * 1000;
      return config;
    },
    chromeWebSecurity: false,
    experimentalOriginDependencies: true,
    includeShadowDom: true,
        // specPattern: "cypress/e2e/features/*.feature",
        // supportFile: false,
  },
  retries: {
    runMode: 0,
    openMode: 0,
  },
  requestTimeout: 60000,
});

// (async () => {
//   await fetchAzureSettings([]);
//   await connectToAllDatabases();
// })();