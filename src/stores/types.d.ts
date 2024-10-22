export interface VM {
  name: string
  status: string
  uuid: string
}

export enum VMStatus {
  running,
  stopped,
}