import { LindatApiV2Model } from "./adapters/LindatApiV2Model";
import { TranslationGraph } from "./domain/TranslationGraph";

/**
 * Initializes a translation graph instance
 */
export function bootstrap(): TranslationGraph {
  const graph = new TranslationGraph();

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

  return graph;
}
