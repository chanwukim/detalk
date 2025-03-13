type ValidationErrorDetail = {
  field: string;
  message: string;
};

export type ErrorMessage = {
  code: string;
  message: string;
  details: ValidationErrorDetail[] | null;
};

export type CursorPaginationRequest = {
  size?: number;
  startId?: number;
};

export type CursorPaginationResponse<T> = {
  items: T[];
  nextId: number | null;
  hasNext: boolean;
};
