module.exports.validateModel = async (req, res, next) => {
    switch (req.originalUrl) {
        case '/ima/api/fetchIncident':
            let message = [];
            var pattern = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
            if (!pattern.test(req.body.fromDate)) {
                message.push("Invalid fromDate, Date format should be 'yyyy-MM-dd'")
            }
            if (!pattern.test(req.body.toDate)) {
                message.push("Invalid toDate, Date format should be 'yyyy-MM-dd'")
            }

            if (message.length === 0) {
                let [fromDate, toDate] = [new Date(req.body.fromDate), new Date(req.body.toDate)]
                if (fromDate > toDate) {
                    message.push("toDate should be greater than fromDate")
                }
            }

            if (message.length > 0) {
                res.status(400).send({ "timeStamp": new Date(), message: message.toString() })
                return;
            } else {
                next()
            }
            break;

        default:
            next()
            break;
    }
}