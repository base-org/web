import { S3Client as AWSS3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { ScopeBackup, ScopeID, Parameter, Type, ParameterID, Environment } from './types';
import { parseJsonThrowingDescriptiveError } from './parse';
import { buildBucketPath } from './utils';
/* eslint-disable */
class S3Client {
  private s3Bucket: string;
  private s3: AWSS3Client;

  constructor(s3Bucket: string, region: string) {
    this.s3Bucket = s3Bucket;
    this.s3 = new AWSS3Client({ region: region });
  }

  private async readFileFromS3(name: string) {
    const command = new GetObjectCommand({
      Bucket: this.s3Bucket,
      Key: name,
    });

    return this.s3.send(command);
  }

  async readObjectData(scopeId: ScopeID): Promise<ScopeBackup> {
    const bucketPath = buildBucketPath(scopeId);
    const result = await this.readFileFromS3(bucketPath);
    if (!result.Body) throw new Error('No bucket data returned from s3 client');

    const fileData = await result.Body.transformToString();
    const parsedFileData = parseJsonThrowingDescriptiveError(fileData);

    // Map from string types in IDs to enums
    const parameters = parsedFileData.parameters.map((parameter: Parameter) => {
      const parameterId = parameter.id as ParameterID;
      parameterId.type = Type[parameterId?.type] as unknown as Type;
      if (!parameterId.scopeId) {
        parameterId.scopeId = {} as ScopeID;
      }
      parameterId.scopeId.env = Environment[parameterId.scopeId.env] as unknown as Environment;
      return { ...parameter, id: parameterId };
    });
    return { parameters };
  }
}
/* eslint-enable */
export default S3Client;
