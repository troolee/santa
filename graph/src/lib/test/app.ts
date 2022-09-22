import { Db } from "mongodb";
import { createApp as createMainApp, SetupCallback } from "src/app";

export function createApp(db: Db | null = null, setupCallback?: SetupCallback) {
  db = db || ({} as Db);
  return createMainApp(db, setupCallback);
}
