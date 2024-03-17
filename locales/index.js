/**
 * Provides parcel async imports for supported languages,
 * also acts as the list of supported languages
 */
export default {
  "en": () => import("./en.json"),
  "cs": () => import("./cs.json"),
  "uk": () => import("./uk.json"),
}
