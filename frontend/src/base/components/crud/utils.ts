import { DataTableColumns } from "../datatable/datatable";

class CrudUtils {
   findId(record: any, cols: DataTableColumns): number | string | undefined {
      let col = cols.find(col => {
         return col.isKey;
      });

      if (col) {
         return record[col.field!];
      }

      return undefined;
   }

   formarErrorListMessage(errorList: Array<any>): string {
      if (errorList.length === 0) {
         return '';
      }
      let message = '';
      errorList.map(error => {
         message = `${message}\n${error.Message}`;

         return error;
      });

      return message;
   }
}


var crudUtils = new CrudUtils();

export { crudUtils };