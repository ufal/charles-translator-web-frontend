import { BackendModule, Services, InitOptions, ReadCallback } from "i18next";
import localeImporters from "../../locales";

/**
 * An i18next backend that loads language resources lazily,
 * kind of like this HTTP backend:
 * https://github.com/i18next/i18next-http-backend/blob/master/lib/index.js
 */
export default class ParcelAsyncImportBackend implements BackendModule<object> {
  readonly type = "backend";

  private resources: Map<string, object> = new Map<string, object>();

  private services: Services;

  public init(
    services: Services,
    backendOptions: object,
    i18nextOptions: InitOptions
  ): void {
    this.services = services;

    this.resources.clear();
  }

  public read(
    language: string,
    namespace: string,
    callback: ReadCallback
  ): void {
    /*
      i18next triggers namespace loads when a react component declares the
      namespace it uses. But if it does not, the namespace does not get loaded.
      Here, we load languages a whole language at a time (no namespace splits).
      To fix the cases where the component does not announce the namespaces it
      uses, we also do a hard-set to the resource store of the i18n instance
      right after we download the language resource.
    */

    // return from cache
    if (this.resources.has(language)) {
      const resource = this.resources.get(language);
      if (typeof resource === "object") {
        callback(null, resource[namespace]);
      } else {
        callback(null, {});
      }
      return;
    }

    // language not supported
    if (!(language in localeImporters)) {
      callback(null, {});
      return;
    }

    // download the language and cache it
    const promise = localeImporters[language]() as Promise<object>;
    promise.then(resource => {
      // cache the language here, if another namespace was to be requested
      this.resources.set(language, resource);
      
      // hard set entire language (so that no further namespace requests
      // are needed and also so that components that do not announce their
      // namespaces do not crash once they attempt to access not-yet-loaded
      // resources)
      this.services.resourceStore.data[language] = resource;
      
      // call back with the loaded data
      callback(null, resource[namespace]);
    }).catch(e => {
      console.error(e);
    });
  }
}
