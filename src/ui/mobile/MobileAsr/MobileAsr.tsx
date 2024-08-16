import { Box } from "@mui/joy";
import { IsoLanguage } from "../../../translation/domain/IsoLanguage";
import { asrService } from "../../../asr";
import { useEffect, useRef } from "react";
import { AsrStream } from "../../../asr/domain/AsrStream";

export interface MobileAsrProps {
  readonly language: IsoLanguage;
}

export function MobileAsr(props: MobileAsrProps) {
  // TODO: dont even create this element if the language is not supported
  if (!asrService.supports(props.language)) {
    return <Box>ASR not supported for this language</Box>;
  }

  const model = asrService.getModel(props.language);

  const mountedRef = useRef<boolean>(false);

  const streamRef = useRef<AsrStream>(new AsrStream());

  const audioContextRef = useRef<AudioContext>(
    new AudioContext({
      sampleRate: model.desiredSampleRateHz,
    }),
  );

  async function onMount() {
    if (mountedRef.current) return;
    mountedRef.current = true;
    console.log("MOUNTING!");
    // return;

    // start an ASR stream
    streamRef.current.onTextUpdated = (newText: string, oldText: string) => {
      // TODO: update the source field appropriately
      console.log("Gotten text:", newText);
    };
    model.processAsrStream(streamRef.current);

    // create a media stream from the microphone
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    const mediaStreamSource =
      audioContextRef.current.createMediaStreamSource(mediaStream);

    // create a recorder and send its audio to the ASR stream
    // TODO: use non-deprecated audio worklets instead
    // const bufferSize = audioContextRef.current.sampleRate * model.desiredChunkDurationSeconds;
    const bufferSize = 2048; // must be a power of two...
    const recorder = audioContextRef.current.createScriptProcessor(
      bufferSize,
      2,
      2,
    );
    recorder.onaudioprocess = (event: AudioProcessingEvent) => {
      // console.log("AUDIOPROCES:", event);
      // console.log(event.inputBuffer.getChannelData(0))
      streamRef.current.sendAudioBuffer(event.inputBuffer);
    };
    mediaStreamSource.connect(recorder);
    recorder.connect(audioContextRef.current.destination);
  }

  function onUnmount() {
    console.log("UNMOUNTING!");
    // streamRef.current.close() // TODO: something like this
    // audioContextRef.current.close();
  }

  useEffect(() => {
    onMount();
    return () => onUnmount();
  }, []);

  return <Box>ASR ...</Box>;
}
