import { OrderItem } from "./OrderItem";
export class OrderData {

  /**
   *
   * @param {[OrderItem]} items
   */
  constructor(public items: OrderItem[]) {
  }

}
