// This file fixes typescript errors for parcel-bundled files that
// typescript does not know about. It does so by creating
// ambient modules (modules that do not really exist):
// https://parceljs.org/features/dependency-resolution/#typescript

// fix SCSS stylesheet modules
declare module '*.module.scss' {
  const value: Record<string, string>;
  export default value;
}
