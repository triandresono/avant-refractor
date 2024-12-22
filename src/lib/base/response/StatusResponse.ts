export default class StatusResponse {
  messageCodes: string;
  errorCodes: string;
  type: string;
  message: string;
  error: string;
  success: boolean;

  constructor({
    messageCodes = "",
    errorCodes = "",
    type = "",
    message = "",
    error = "",
    success = false,
  }: StatusParams) {
    this.messageCodes = messageCodes;
    this.errorCodes = errorCodes;
    this.type = type;
    this.message = message;
    this.error = error;
    this.success = success;
  }

  static fromMap(map: Record<string, any>): StatusResponse {
    const get = (data: any): string => {
      if (Array.isArray(data) && data.every(item => typeof item === 'string')) {
        return data.join();
      } else {
        return data ?? "";
      }
    }

    return new StatusResponse({
      message: get(map['messages']),
      error: get(map['errors']),
      messageCodes: map['messageCodes'] ?? [],
      errorCodes: map['errorCodes'] ?? [],
      success: map['success'] ?? false,
    });
  }

  static exception(e: any): StatusResponse {
    return new StatusResponse({
      errorCodes: `[Mobile Exception] : ${e.toString()}`,
      success: false,
    });
  }

  static cnd(desc: string = "", messageCodes: string = ""): StatusResponse {
    return new StatusResponse({
      messageCodes,
      errorCodes: desc,
      success: false,
    });
  }
}


interface StatusParams {
  messageCodes?: string;
  type?: string;
  errorCodes?: string;
  message?: string;
  error?: string;
  success?: boolean;
}

