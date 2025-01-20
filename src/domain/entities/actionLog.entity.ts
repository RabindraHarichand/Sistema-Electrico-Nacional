import { EventType } from "../../shared/types/event.types";

export class ActionLog {
  constructor(
    public readonly id: string,
    public readonly message: string,
    public readonly username: string,
    public readonly eventType: EventType,
    public readonly createdAt: string
  ) {}
}
