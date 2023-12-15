import pg from "pg";

interface CoreDataMapper {
  client: object;
  tableName: string;
  columns: string;

  createFunctionName: string;
  updateFunctionName: string;

  allProjectsWithCategories: string;
  userIdentity: string;
  articlesByUser: string;
  articleByUser: string;
  goldenBookTicketByUser: string;

  projectsByUser: string;
  projectByUser: string;

  createWithCategoriesFunctionName: string;
  updateWithCategoriesFunctionName: string;
}

class CoreDataMapper {
  constructor(client: object) {
    this.client = client;
  }

  //& Create
  async create(inputData: object) {
    
    const inputDatalength = Object.keys(inputData).length;
    let dollar = [];
    let inputdataKey = [];
    let inputDataValue = [];
    for (const [key, value] of Object.entries(inputData)) {
      inputdataKey.push(key);
      inputDataValue.push(value);
    }

    for (let i = 0; i < inputDatalength; i++) {
      dollar.push(`$` + [i + 1]);
    }
   
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `INSERT INTO "${this.tableName}" (${this.columns}) VALUES (${dollar});`,
        values: inputDataValue,
      };
      
      
      const result = await this.client.query(preparedQuery);
      return result.rows;
    }
  }

  //& FindAll
  // async findAll() {
  //   if (this.client instanceof pg.Pool) {
  //     const preparedQuery = {
  //       text: `SELECT * FROM  "${this.tableName}"
  //                    ORDER BY "id";`,
  //     };

  //     const result = await this.client.query(preparedQuery);
  //     return result.rows;
  //   }
  // }

  //& FindOne
  async findOne(id: number | undefined) {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `
                     SELECT ${this.columns}
                    FROM "${this.tableName}"
                     WHERE "id" = $1;
                     `,
        values: [id],
      };

      const result = await this.client.query(preparedQuery);

      if (!result.rows[0]) return null;

      return result.rows[0];
    }
  }

  //& Update
  async update(inputData: object) {
    if (this.client instanceof pg.Pool) {
      const inputDatalength = Object.keys(inputData).length;
      let dollar = [];
      let inputdataKey = [];
      let inputDataValue = [];
      let identity = [];
      for (const [key, value] of Object.entries(inputData)) {
        if (key === "id") {
          identity.push(value);
        } else {
          inputdataKey.push(key);

          inputDataValue.push(value);
        }
      }

      for (let i = 0; i < inputDatalength; i++) {
        dollar.push(`$` + [i + 1]);
      }

      let text = `UPDATE "${this.tableName}" SET`;

      for (let i = 0; i < inputdataKey.length; i++) {
        if (i < inputdataKey.length - 1) {
          text += ` "${inputdataKey[i]}" = ${dollar[i]},`;
        } else {
          text += ` "${inputdataKey[i]}" = ${dollar[i]}`;
        }
        if (i >= inputdataKey.length - 1) {
          text += ` WHERE "id" = ${identity};`;
        }
      }

      const preparedQuery = {
        text,
        values: inputDataValue,
      };
      const result = await this.client.query(preparedQuery);
      
      return result.rowCount;
    }
  }

  //& Delete
  async delete(id: number) {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `
                         DELETE FROM "${this.tableName}"
                         WHERE "id" = $1;
                         `,
        values: [id],
      };

      const result = await this.client.query(preparedQuery);

      return result.rowCount;
    }
  }
}

export { CoreDataMapper };