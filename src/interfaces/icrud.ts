
export interface ICrud {
  getAll: (listCount: number, pageNumber:number, orderBy:Object) => Promise<any>,
  getByID: (id: string) => Promise<any>,
  insert: (entity: Object) => Promise<any>,
  update: (id:string, entity: Object) => Promise<boolean>,
  remove: (id: string) => Promise<boolean>
}
