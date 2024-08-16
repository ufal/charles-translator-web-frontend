import { LindatCunispeechModel } from "./adapters/LindatCunispeechModel";
import { AsrService } from "./domain/AsrService";

export function bootstrap(): AsrService {
  const asrService = new AsrService();

  asrService.useModel("cs", new LindatCunispeechModel());

  return asrService;
}
