function clamp(value: number): number {
  if (value > 1.0) return 1.0;
  if (value < -1.0) return -1.0;
  return value;
}

/**
 * Takes in samples in the float32 format, where values oscilate around zero,
 * and are typically constrained to -1.0 to +1.0 range. It takes this exact
 * range and re-maps it to int16 full range of -32767 to +32767. Values outside
 * this range are clamped to the edges (overdrive effect style).
 * The minInt16 value of -32768 is not used in the output.
 */
export function float32toInt16Samples(inSamples: Float32Array): Int16Array {
  const outSamples = new Int16Array(inSamples.length);

  for (let i = 0; i < inSamples.length; i++) {
    const float32value = inSamples[i];
    outSamples[i] = clamp(float32value) * 32767.0;
  }

  return outSamples;
}
