export class AddDiscountDTO {
  constructor(private readonly id: number, private readonly discount: number) {}
}

export class RemoveDiscountDTO {
  constructor(private readonly id: number, private readonly discount: number) {}
}
