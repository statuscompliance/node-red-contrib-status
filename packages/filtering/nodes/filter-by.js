module.exports = function (RED) {
    function FilterByNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on("input", function (msg) {
            let attribute = msg.req && msg.req.body && msg.req.body.attribute !== undefined ? msg.req.body.attribute : config.attribute;
            let value = msg.req && msg.req.body && msg.req.body.value !== undefined ? msg.req.body.value : config.value;

            let type = msg.req && msg.req.body && msg.req.body.valueType !== undefined ? msg.req.body.valueType : config.valueType;
            // Filtrar mensajes basados en el tipo seleccionado
            switch (type) {
                case "Clasification":
                    if (msg.payload[attribute] === value) {
                        node.send(msg);
                    }
                    break;
                case "Importance":
                    if (msg.payload[attribute] === value) {
                        node.send(msg);
                    }
                    break;
                case "ContentType":
                    if (msg.payload[attribute] === value) {
                        node.warn(msg.payload);
                        node.send(msg);
                    }
                    break;
                case "DateFromToday":
                    var months = parseInt(value);
                    var documentDate = new Date(msg.payload[attribute]);
                    var limitDate = new Date();
                    limitDate.setMonth(limitDate.getMonth() - months);
                    if (documentDate >= limitDate) {
                        node.send(msg);
                    }
                    break;
                case "State":
                    if (msg.payload[attribute] === value) {
                        node.send(msg);
                    }
                    break;
                case "ActivityPipe":
                    if (msg.payload[attribute] === value) {
                        node.send(msg);
                    }
                    break;
                case "AssetPipe":
                    if (msg.payload[attribute] === value) {
                        node.send(msg);
                    }
                    break;
                case "ActorPipe":
                    if (msg.payload[attribute] === value) {
                        node.send(msg);
                    }
                    break;
                default:
                    node.warn("Invalid filter type");
                    break;
            }
        });
    }
    RED.nodes.registerType("filter-by", FilterByNode);
};
