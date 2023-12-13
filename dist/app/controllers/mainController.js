import debug from 'debug';
const logger = debug('Controller');
const renderHomePage = (req, res) => {
    try {
        res.json({
            message: 'Hello World',
        });
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { renderHomePage };
//# sourceMappingURL=mainController.js.map