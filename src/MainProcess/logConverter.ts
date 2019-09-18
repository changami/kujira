export function getLogSeparatorIndexes(logLines: string[]): ContainerLogIndexes {
  return (!logLines[0] || !logLines[0].match(/^CONTAINER ID/i)) ? null : {
    containerId: logLines[0].match('CONTAINER ID').index,
    image: logLines[0].match('IMAGE').index,
    command: logLines[0].match('COMMAND').index,
    created: logLines[0].match('CREATED').index,
    status: logLines[0].match('STATUS').index,
    ports: logLines[0].match('PORTS').index,
    names: logLines[0].match('NAMES').index,
  };
}

export function createContainersFromConsole(log: string): ContainerData[] {
  const logLines = log.split('\n');

  const indexes: ContainerLogIndexes = getLogSeparatorIndexes(logLines);
  if (!indexes) return [];

  const containerLines = logLines.filter(logLine => logLine && !logLine.match(/^CONTAINER ID/i));

  return containerLines.map(containerLine => ({
    containerId: containerLine.slice(indexes.containerId, indexes.image - 1).trim(),
    image: containerLine.slice(indexes.image, indexes.command - 1).trim(),
    command: containerLine.slice(indexes.command, indexes.created - 1).trim(),
    created: containerLine.slice(indexes.created, indexes.status - 1).trim(),
    status: containerLine.slice(indexes.status, indexes.ports - 1).trim(),
    ports: containerLine.slice(indexes.ports, indexes.names - 1).trim(),
    names: containerLine.slice(indexes.names).trim(),
  }));
}
