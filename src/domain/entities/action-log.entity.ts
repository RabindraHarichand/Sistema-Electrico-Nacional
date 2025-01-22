import { EventType } from "../../shared/types/event.types";
import { CustomError } from "../errors/custom.error";

export class ActionLog {
  constructor(
    public readonly id: string,
    public readonly message: string,
    public readonly username: string,
    public readonly eventType: EventType,
    public readonly createdAt?: string
  ) {}

  public static fromObject(object: { [key: string]: any }): ActionLog {
    const { id, message, username, eventType, createdAt } = object;

    if (!id) throw CustomError.badRequest("Missing id");
    if (!message) throw CustomError.badRequest("Missing message");
    if (!username) throw CustomError.badRequest("Missing username");

    if (!eventType) throw CustomError.badRequest("Missing eventType");
    if (!eventType.includes(eventType as EventType))
      throw CustomError.badRequest(
        `Invalid event type. Valid event types are ${eventType}`
      );

    return new ActionLog(id, message, username, eventType, createdAt);
  }
}
