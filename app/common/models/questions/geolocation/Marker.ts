export class Marker {
  constructor(public latitude: number,
              public longitude: number,
              public color: string = 'blue',
              public tooltip?: string,
              public visible: boolean = true
  ) {
  }


}
