class SessionData {
  private static sessionData: Map<string, Map<string, any>> = new Map();

  public static getCurrentSession(): Map<string, any> {
    let session = this.sessionData.get(this.getCurrentThreadId());
    if (!session) {
      session = new Map();
      this.sessionData.set(this.getCurrentThreadId(), session);
    }
    return session;
  }

  public static clearSession(): void {
    this.sessionData.delete(this.getCurrentThreadId());
  }

  public static sessionVariableCalled(key: string): any {
    const value = this.getCurrentSession().get(key);
    console.debug(`Session variable called: key: ${key}, value: ${value}`);
    return value;
  }

  public static setSessionVariable(key: string): { to: (value: any) => void } {
    return {
      to: (value: any): void => {
        if (value !== null && value !== undefined) {
          console.debug(`Set session variable key: ${key}, value: ${value}`);
          this.getCurrentSession().set(key, value);
        } else {
          this.getCurrentSession().delete(key);
        }
      },
    };
  }

  private static getCurrentThreadId(): string {
    return "mainThread";
  }

  public static format(
    cost: number,
    placesFormat: string,
    roundOff: boolean = true
  ): string {
    const multiplier = Math.pow(10, placesFormat.length - 1);
    if (roundOff) {
      return (Math.round(cost * multiplier) / multiplier).toFixed(
        placesFormat.length - 2
      );
    } else {
      return (Math.floor(cost * multiplier) / multiplier).toFixed(
        placesFormat.length - 2
      );
    }
  }

  public static formatDouble(input: string): string {
    const value = parseFloat(input);
    if (Number.isNaN(value)) {
      return input;
    }
    return value === Math.floor(value)
      ? String(Math.floor(value))
      : String(value);
  }

  public static formatTxtWithSessionVariable(txt: string): string {
    const pattern = /\{([^{}]+)\}/g;
    return txt.replace(pattern, (match, key) => {
      const sessionValue = this.sessionVariableCalled(key);
      if (sessionValue === undefined) {
        throw new Error(`${key} is not available in Session`);
      }
      return sessionValue;
    });
  }

  public static fixedLengthString(string: string, length: number): string {
    return string.padEnd(length);
  }
}

export default SessionData;
