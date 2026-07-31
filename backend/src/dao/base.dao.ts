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
  }): Promise<T[]> {

    let sql = `
      SELECT *
      FROM ${this.tableName}
    `;

    const params: unknown[] = [];

    if (options?.where && Object.keys(options.where).length > 0) {

      const fields = Object.keys(options.where);

      this.validateColumns(fields);

      const conditions = fields.map(field => {
        params.push(options.where![field]);
        return `${field} = ?`;
      });

      sql += `
        WHERE ${conditions.join(" AND ")}
      `;
    }

    if (options?.orderBy) {

      this.validateColumns([options.orderBy]);

      const order = options.order === "DESC"
        ? "DESC"
        : "ASC";

      sql += `
        ORDER BY ${options.orderBy} ${order}
      `;
    }

    if (options?.limit) {

      const page = options.page ?? 1;

      const first = ((page - 1) * options.limit) + 1;
      const last = page * options.limit;

      sql += `
        ROWS ${first} TO ${last}
      `;
    }

    return this.db.query<T>(sql, params);

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

  async delete(id: number) {

    return this.db.query(`
      DELETE FROM ${this.tableName}
      WHERE ID = ?
    `, [id]);

  }

}