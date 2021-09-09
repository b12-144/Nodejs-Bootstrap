
export class MongoHelper{

  public static isValidObjectID(id:string):boolean{//Using this since ObjectID.isValid is not working.
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      return true;
    } else {
      return false;
    }
  }
}
