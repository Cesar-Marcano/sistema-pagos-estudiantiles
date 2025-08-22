export class AddDiscountDTO {
  constructor(public readonly id: number, private readonly discount: number) {}
}

export class RemoveDiscountDTO {
  constructor(public readonly id: number, private readonly discount: number) {}
}
