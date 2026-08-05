export default class Controller<T> {
   private _clazz: new () => T;
   public DAO: T;

   constructor(clazz: new () => T) {
      this._clazz = clazz;
      this.DAO = this.createInstance(clazz);
   }

   protected createInstance<A>(c: new () => A): A {
      return new c();
   }

   new = <T>(dados?: Partial<T>): T => {
      if (!dados)
         return {} as T;

      return dados as T
   }
}