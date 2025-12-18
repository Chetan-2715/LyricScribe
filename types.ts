
export interface TransliterationState {
  image: string | null;
  result: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface FileData {
  base64: string;
  mimeType: string;
}
