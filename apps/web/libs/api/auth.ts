export type ProviderCallback = {
  "jwt": string,
  "user": {
    "id": number,
    "username": string
    "email": string,
    "provider": string,
    "confirmed": boolean,
    "blocked": boolean,
    "createdAt": Date,
    "updatedAt": Date
  }
}
