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

export interface CreateVMPayload {
  name: string;
  ostype: string;
  iso: string;
  basefolder: string;
  network_iface: string;
  memory: {
    size: number;
    vram: number;
  };
  disk: {
    path: string;
    size: number;
  };
  rdp: {
    enabled: boolean;
    vnc_passwd: string;
  };
}