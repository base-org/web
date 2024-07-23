import { Parameter, ParameterID, ScopeID, Environment, Type } from './types';
/* eslint-disable */
export function buildParameterId(
  accountId: string,
  regionCode: string,
  scopeName: string,
  type: Type,
  name: string,
): ParameterID {
  return {
    scopeId: buildScopeId(accountId, regionCode, scopeName),
    type,
    name,
  };
}

export function buildScopeId(accountId: string, regionCode: string, name: string): ScopeID {
  return {
    env: Environment['USE_NAMESPACE'],
    namespace: {
      accountId,
      regionCode,
    },
    name,
  };
}

export function parameterIdToString(id: ParameterID): string {
  return `p:${id.scopeId?.namespace?.accountId}:${id.scopeId?.namespace?.regionCode}:${id.scopeId?.name}:${id.type}:${id.name}`;
}

export function scopeIdToString(id: ScopeID): string {
  return `s:${id.namespace?.accountId}:${id.namespace?.regionCode}:${id.name}`;
}

export function parameterIdFromString(id: string): ParameterID {
  const idParts = id.split(':');
  if (idParts.length !== 6 || idParts[0] !== 'p') {
    throw new Error('Invalid parameter ID string');
  }

  return buildParameterId(idParts[1], idParts[2], idParts[3], parseInt(idParts[4]), idParts[5]);
}

export function scopeIdFromString(id: string): ScopeID {
  const idParts = id.split(':');
  if (idParts.length !== 4 || idParts[0] !== 's') {
    throw new Error('Invalid scope ID string');
  }

  return buildScopeId(idParts[1], idParts[2], idParts[3]);
}

export function buildBucketPath(scopeId: ScopeID): string {
  return `${scopeId.namespace?.accountId}/${scopeId.namespace?.regionCode}/${scopeId.name}`;
}

export function findParameterFactory(
  parameterId: ParameterID,
): (scopeParams: Parameter[]) => Parameter {
  return function findParameter(scopeParams: Parameter[]): Parameter {
    const parameter = scopeParams.find(
      (param) => param.id?.name === parameterId.name && param.id?.type === parameterId.type,
    );
    if (!parameter) throw new Error('Parameter does not exist');
    return parameter;
  };
}

export function typeStringFromTypeEnum(key: any) {
  return Object.keys(Type)[Object.values(Type).indexOf(key)];
}
/* eslint-enable */
