declare module ServiceConfiguration {
  function test();
  export module configurations {
    export function upsert(service: any, operation: any);
    export function findOne(query: any);
  }
  

}
