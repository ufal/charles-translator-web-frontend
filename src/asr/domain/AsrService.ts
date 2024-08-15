import { IsoLanguage } from "../../translation/domain/IsoLanguage";
import { AsrModel } from "./AsrModel";

/**
 * Provides access to all ASR services for the translator
 */
export class AsrService {
  private readonly models: Map<IsoLanguage, AsrModel> = new Map<
    IsoLanguage,
    AsrModel
  >();

  /**
   * Registers a model to be used for a given language
   */
  public useModel(language: IsoLanguage, model: AsrModel) {
    if (this.models.has(language)) {
      throw new Error(`The language ${language} already has an ASR model.`);
    }
    this.models.set(language, model);
  }

  /**
   * Returns true if the given language can be recognized
   */
  public supports(language: IsoLanguage): boolean {
    return this.models.has(language);
  }

  /**
   * Returns an ASR model for a given source language
   */
  public getModel(language: IsoLanguage): AsrModel {
    if (!this.supports(language)) {
      throw new Error(`The language ${language} is not supported for ASR.`);
    }
    return this.models.get(language)!;
  }
}
