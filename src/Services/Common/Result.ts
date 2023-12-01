export default interface ApiResponse<T> {
  responseType: ResponseType;
  responseDescription: string;
  responseData: T;
}

export enum ResponseType {
  Success,
  Warning,
  Error,
}
