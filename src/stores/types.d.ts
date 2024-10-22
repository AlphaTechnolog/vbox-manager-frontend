export interface VM {
  name: string
  status: string
  uuid: string
}

export enum VMStatus {
  running,
  stopped,
}

export type StartVMResponse = {
  is_err: boolean
  message: string
}