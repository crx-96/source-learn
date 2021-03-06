import { RedisError } from "redis-errors";

export default class ClusterAllFailedError extends RedisError {
  static defaultMessage = "Failed to refresh slots cache.";

  constructor(message, public lastNodeError: RedisError) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  get name(): string {
    return this.constructor.name;
  }
}
