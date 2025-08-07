import { Session } from "@prisma/client";
import { RawUserPayload } from "../../../src/interfaces/tokenPayload";

export const userMock: RawUserPayload = {
  id: 1,
  name: "Foo Bar",
  role: "ADMIN",
  username: "foo_bar123",
};

export const sessionData: Session = {
  id: 1,
  createdAt: new Date(),
  jti: "mocked-jti",
  userId: 1,
};
