export class MissingEnvironmentVariableError extends Error {
  variableName: string;

  constructor(variableName: string) {
    super(`Missing required environment variable: ${variableName}`);
    this.name = 'MissingEnvironmentVariableError';
    this.variableName = variableName;
  }
}

export function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new MissingEnvironmentVariableError(name);
  }
  return value;
}

export function isMissingEnvironmentVariableError(
  error: unknown
): error is MissingEnvironmentVariableError {
  return error instanceof MissingEnvironmentVariableError;
}
