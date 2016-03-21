
export interface RawChoice {
  text?: string,
  name?: string,
  imageUrl?: string,
  image_url?: string,
  fbId?: string,
  fb_id?: string,
  pageId?: string,
  page_id?: string

}

export class Choice {


  constructor(public text:string,
              public fbId:string,
              public pageId:string,
              public imageUrl:string) 
  {
  }


  static fromRaw(data:RawChoice) {
    let text: string = data.text? data.text: data.name;
    let fbId: string = data.fbId? data.fbId: data.fb_id;
    let pageId: string = data.pageId? data.pageId: data.page_id;
    let imageUrl: string = data.imageUrl? data.imageUrl: data.image_url;
    return new Choice(text, fbId, pageId, imageUrl);
  };

}
