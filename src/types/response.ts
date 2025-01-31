export interface IParameterResult {
  type: string;
  id: string;
  attributes: {
    slug: string;
    name: string;
    description: string;
    uom: string;
    sourceType: string;
    placeholder: number;
    value: {
      value?: number;
      last_update?: string;
    };
  };
}
