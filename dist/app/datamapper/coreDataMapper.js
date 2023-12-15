import pg from "pg";
class CoreDataMapper {
    constructor(client) {
        this.client = client;
    }
    async create(inputData) {
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
    async findOne(id) {
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
            if (!result.rows[0])
                return null;
            return result.rows[0];
        }
    }
    async update(inputData) {
        if (this.client instanceof pg.Pool) {
            const inputDatalength = Object.keys(inputData).length;
            let dollar = [];
            let inputdataKey = [];
            let inputDataValue = [];
            let identity = [];
            for (const [key, value] of Object.entries(inputData)) {
                if (key === "id") {
                    identity.push(value);
                }
                else {
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
                }
                else {
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
    async delete(id) {
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
//# sourceMappingURL=coreDataMapper.js.map