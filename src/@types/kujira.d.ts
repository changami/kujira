interface ContainerData {
  containerId: string;
  image: string;
  command: string;
  created: string;
  status: string;
  ports: string;
  names: string;
}

interface ContainerLogIndexes {
  containerId: number;
  image: number;
  command: number;
  created: number;
  status: number;
  ports: number;
  names: number;
}
