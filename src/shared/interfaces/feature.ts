export interface Feature<Input, Output> {
  execute(input: Input): Output;
}
