import {
  EventType,
  eventType as event,
} from "../../../shared/types/event.types";

export class CreateActionLogDto {
  constructor(
    public readonly message: string,
    public readonly username: string,
    public readonly eventType: EventType
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateActionLogDto?] {
    const { message, username, eventType } = props;

    if (!message) return ["Missing message"];

    if (!username) return ["Missing username"];

    if (!eventType) return ["Missing event Type"];
    eventType;
    if (!event.includes(eventType))
      return [`Invalid role. Valid roles are ${event}`];

    return [
      undefined,
      new CreateActionLogDto(message, username, eventType as EventType),
    ];
  }
}
