import { FirebirdDatabase } from "../database/firebird";

export class BaseDAO<T> {

  constructor(
    protected db: FirebirdDatabase,
    protected tableName: string,
    protected allowedColumns: Set<string>
  ) { }

  private validateColumns(columns: string[]) {

    for (const column of columns) {

      if (!this.allowedColumns.has(column)) {
        throw new Error(`Coluna inválida: ${column}`);
      }

    }

  }

  async find(options?: {
    page?: number;
    limit?: number;
    where?: Record<string, unknown>;
    orderBy?: string;
    order?: "ASC" | "DESC";
  }) {

    const page =
      options?.page && options.page > 0
        ? options.page
        : 1;

    const limit =
      options?.limit && options.limit > 0
        ? options.limit
        : 50;

    let whereSQL = "";

    const params: unknown[] = [];

    if (
      options?.where &&
      Object.keys(options.where).length > 0
    ) {

      const fields = Object.keys(options.where);

      this.validateColumns(fields);

      const conditions = fields.map(field => {

        params.push(options.where![field]);

        return `${field} = ?`;

      });

      whereSQL = `WHERE ${conditions.join(" AND ")}`;
    }


    const totalResult =
      await this.db.query<{ TOTAL: number }>(
        `
        SELECT COUNT(ID) AS TOTAL
        FROM ${this.tableName}
        ${whereSQL}
        `,
        [...params]
      );

    const total =
      Number(totalResult[0]?.TOTAL ?? 0);


    let sql = `
        SELECT *
        FROM ${this.tableName}
        ${whereSQL}
    `;


    if (options?.orderBy) {

      this.validateColumns([
        options.orderBy
      ]);

      sql += `
            ORDER BY ${options.orderBy}
            ${options.order === "DESC" ? "DESC" : "ASC"}
        `;

    }


    const first =
      ((page - 1) * limit) + 1;


    const last =
      page * limit;


    sql += `
        ROWS ${first} TO ${last}
    `;


    const data =
      await this.db.query<T>(
        sql,
        [...params]
      );


    return {
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };

  }

  async findById(id: number): Promise<T | null> {

    const result = await this.db.query<T>(`
      SELECT *
      FROM ${this.tableName}
      WHERE ID = ?
    `, [id]);

    return result[0] ?? null;

  }

  async insert(data: Record<string, unknown>): Promise<number> {

    const filtered = Object.fromEntries(
      Object.entries(data)
        .filter(([, value]) => value !== undefined)
    );

    const fields = Object.keys(filtered);

    if (fields.length === 0) {
      throw new Error("Nenhum campo informado.");
    }

    this.validateColumns(fields);

    const values = Object.values(filtered);

    const sql = `
        INSERT INTO ${this.tableName}
        (${fields.join(",")})
        VALUES (${fields.map(() => "?").join(",")})
        RETURNING ID
    `;

    const result = await this.db.queryOne<{ ID: number }>(
      sql,
      values
    );

    if (!result) {
      throw new Error(
        "Não foi possível recuperar o ID inserido."
      );
    }

    return result.ID;
  }

  async update(id: number, data: Record<string, unknown>) {

    const filtered = Object.fromEntries(
      Object.entries(data)
        .filter(([, value]) => value !== undefined)
    );

    const fields = Object.keys(filtered);

    if (fields.length === 0) {
      throw new Error("Nenhum campo informado.");
    }

    this.validateColumns(fields);

    const values = Object.values(filtered);

    const sql = `
      UPDATE ${this.tableName}
      SET ${fields.map(field => `${field} = ?`).join(",")}
      WHERE ID = ?
    `;

    return this.db.query(sql, [
      ...values,
      id
    ]);

  }

  async delete(id: number): Promise<number> {

    const existente = await this.findById(id);

    if (!existente) {
      return 0;
    }


    await this.db.query(
      `
        DELETE FROM ${this.tableName}
        WHERE ID = ?
        `,
      [id]
    );


    return 1;

  }

}