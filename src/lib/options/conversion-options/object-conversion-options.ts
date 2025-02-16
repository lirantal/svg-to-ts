import { Delimiter } from '../../generators/code-snippet-generators';

export interface ObjectConversionOptions {
  tsx: boolean;
  config?: string;
  srcFiles?: string[];
  outputDirectory?: string;
  svgoConfig?: any;
  delimiter?: Delimiter;
  verbose?: boolean;
  fileName?: string;
  objectName?: string;
  typeName?: string;
  generateType?: boolean;
}
