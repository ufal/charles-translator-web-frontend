// Taken from:
// https://github.com/awslabs/aws-lex-browser-audio-capture/blob/master/lib/worker.js#L46

/**
 * Downsamples a buffer of audio samples to a lower temporal resolution
 * with linear interpolation in between sample values.
 */
export function downsampleBuffer(
  buffer: Float32Array,
  inputRateHz: number,
  targetRateHz: number,
): Float32Array {
  if (targetRateHz > inputRateHz) {
    throw new Error("Cannot upsample audio, only downsample.");
  }
  if (targetRateHz === inputRateHz) {
    return buffer;
  }
  var sampleRateRatio = inputRateHz / targetRateHz;
  var newLength = Math.round(buffer.length / sampleRateRatio);
  var result = new Float32Array(newLength);
  var offsetResult = 0;
  var offsetBuffer = 0;
  while (offsetResult < result.length) {
    var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
    var accum = 0,
      count = 0;
    for (var i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
      accum += buffer[i];
      count++;
    }
    result[offsetResult] = accum / count;
    offsetResult++;
    offsetBuffer = nextOffsetBuffer;
  }
  return result;
}
