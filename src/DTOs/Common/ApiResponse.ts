export class ApiResponse<T> {
  responseType: ResponseType = ResponseType.Default;
  responseDescription: string = "";
  responseData: T | undefined = getDefault<T>();
}

export function getDefault<T>(): T | undefined {
  return undefined;
}

export enum ResponseType {
  Success = "SUCCESS",
  Warning = "WARNING",
  Error = "ERROR",
  Default = "",
}
