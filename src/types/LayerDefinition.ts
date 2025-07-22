export type LayerDefinition<T extends Record<string, any>> = {
  id: string;
  name: string;
  fields: {
    [k in keyof T]: string;
  }
}