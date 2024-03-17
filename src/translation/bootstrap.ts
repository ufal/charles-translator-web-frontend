import { LindatApiV2Model } from "./adapters/LindatApiV2Model";
import { TranslationGraph } from "./domain/TranslationGraph";

/**
 * Initializes a translation graph instance
 */
export function bootstrap(): TranslationGraph {
  const graph = new TranslationGraph();

  // Core pairs used since the beginning

  graph.addStep(new LindatApiV2Model("cs", "uk"));
  graph.addStep(new LindatApiV2Model("uk", "cs"));

  graph.addStep(new LindatApiV2Model("cs", "en"));
  graph.addStep(new LindatApiV2Model("en", "cs"));

  graph.addStep(new LindatApiV2Model("cs", "ru"));
  graph.addStep(new LindatApiV2Model("ru", "cs"));

  graph.addStep(new LindatApiV2Model("pl", "en"));
  graph.addStep(new LindatApiV2Model("en", "pl"));

  graph.addStep(new LindatApiV2Model("cs", "fr"));
  graph.addStep(new LindatApiV2Model("fr", "cs"));

  graph.addStep(new LindatApiV2Model("fr", "en"));
  graph.addStep(new LindatApiV2Model("en", "fr"));

  // Additional ok pairs

  graph.addStep(new LindatApiV2Model("uk", "en"));
  graph.addStep(new LindatApiV2Model("en", "uk"));

  graph.addStep(new LindatApiV2Model("ru", "en"));
  graph.addStep(new LindatApiV2Model("en", "ru"));

  // Admin-only pairs
  // TODO: add admin toggle

  // graph.addStep(new LindatApiV2Model("fr", "uk"));
  // graph.addStep(new LindatApiV2Model("uk", "fr"));

  // graph.addStep(new LindatApiV2Model("pl", "uk"));
  // graph.addStep(new LindatApiV2Model("uk", "pl"));

  // graph.addStep(new LindatApiV2Model("en", "hi"));

  // graph.addStep(new LindatApiV2Model("de", "en"));
  // graph.addStep(new LindatApiV2Model("en", "de"));

  // NOTE: not all pairs listed even here...

  return graph;
}
