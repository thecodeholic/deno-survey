export default class User {
  public id: string = '';

  constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {

  }
}