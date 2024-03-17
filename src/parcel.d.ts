// This file fixes typescript errors for parcel-bundled files that
// typescript does not know about. It does so by creating
// ambient modules (modules that do not really exist):
// https://parceljs.org/features/dependency-resolution/#typescript

// fix SCSS stylesheet modules
declare module '*.module.scss' {
  const value: Record<string, string>;
  export default value;
}

// fix PNG images
declare module '*.png' {
  const value: string;
  export default value;
}

// fix SVG images
declare module '*.svg' {
  const value: string;
  export default value;
}

// fix JSON files
declare module '*.json' {
  const value: Record<string, any>;
  export default value;
}
