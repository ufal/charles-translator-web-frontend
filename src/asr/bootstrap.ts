import { LindatCunispeechModel } from "./adapters/LindatCunispeechModel";
import { AsrService } from "./domain/AsrService";

export function bootstrap(): any {
  const asrService = new AsrService();

  asrService.useModel("cs", new LindatCunispeechModel());

  return asrService;
}
