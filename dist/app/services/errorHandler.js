import { errorLoggerHandling } from "../../app/services/errorLoggerHandling.js";
class ErrorApi extends Error {
    constructor(message, req, res, statusCode = 500) {
        super(message);
        res.status(statusCode).json({ message: message });
        errorLoggerHandling(message, req, res);
    }
}
export { ErrorApi };
//# sourceMappingURL=errorHandler.js.map