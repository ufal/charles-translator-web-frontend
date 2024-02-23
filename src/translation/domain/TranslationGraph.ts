import { IsoLanguage } from "./IsoLanguage";
import { TranslationPath } from "./TranslationPath";
import { TranslationStep } from "./TranslationStep";

/**
 * A multigraph of languages and translation models that can be used to
 * look up translation paths for messages.
 */
export class TranslationGraph {
  private languages: Set<IsoLanguage> = new Set();
  private stepsByOrigin: Map<IsoLanguage, TranslationStep[]> = new Map();
  private stepsByTarget: Map<IsoLanguage, TranslationStep[]> = new Map();

  /**
   * Adds a new translation step to the graph
   */
  public addStep(step: TranslationStep): void {
    this.languages.add(step.origin);
    this.languages.add(step.target);

    if (!this.stepsByOrigin.has(step.origin))
      this.stepsByOrigin.set(step.origin, []);
    this.stepsByOrigin.get(step.origin)!.push(step);

    if (!this.stepsByTarget.has(step.target))
      this.stepsByTarget.set(step.target, []);
    this.stepsByTarget.get(step.target)!.push(step);
  }

  /**
   * Finds a directed translation path between two languages and returns
   * null if no such path exists.
   */
  public getPath(from: IsoLanguage, to: IsoLanguage): TranslationPath | null {
    /*
     * NOTE: For now, lookup only direct translations, but in the future
     * a graph search can be performed here.
     */

    if (!this.stepsByOrigin.has(from)) {
      return null;
    }

    const outgoingSteps = this.stepsByOrigin.get(from)!;
    const availableSteps = outgoingSteps.filter((s) => s.target === to);

    if (availableSteps.length === 0) {
      return null;
    }

    return new TranslationPath([availableSteps[0]]);
  }

  /**
   * Returns the set of all languages reachable from the given language
   * as a sorted javascript array
   */
  public getReachableLanguagesFrom(from: IsoLanguage): IsoLanguage[] {
    /*
     * NOTE: For now, lookup only direct translations, but in the future
     * a graph search can be performed here.
     */

    const languages = new Set<IsoLanguage>();

    if (!this.stepsByOrigin.has(from)) {
      return [];
    }

    this.stepsByOrigin
      .get(from)!
      .map((s) => s.target)
      .forEach((s) => languages.add(s));

    return [...languages].sort();
  }
}
