import {Project} from "./project.dto";

export type Key = {
  licensedTo: string,
  expires: string,
  projectId: string,
  lastUsedIp?: string,
  lastUsed?: string,
  activated: boolean,
  label: string,
  key: string
}
