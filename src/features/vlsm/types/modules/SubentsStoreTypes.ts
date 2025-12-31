type optimalVLSM = {
  total: number,
  status: string;
};
type Subnet = {
  id: number;
  room: string;
  hosts: number;
};

type SubnetCalculated = {
  subnet: Subnet;
  cidr: number;
  totalIps: number;
  usableHosts: number;
  usableHostsRange: number;
  start: string;
  network: string;
  end: string;
  broadcast: string;
  label?: string;
  value?: number;
  color?: string;
};


export type {
  optimalVLSM,
  Subnet,
  SubnetCalculated
};
