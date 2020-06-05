export default class BaseModel {
  public prepare(data: any) {
    data.id = data._id.$oid;
    delete data._id;
    return data;
  }
}