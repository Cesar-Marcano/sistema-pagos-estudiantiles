export class AddDiscountDTO {
  constructor(public readonly id: number, public readonly discount: number) {}
}

export class RemoveDiscountDTO {
  constructor(public readonly id: number, public readonly discount: number) {}
}
