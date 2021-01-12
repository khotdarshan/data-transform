exports.transformData = function (payload, referenceData) {
    return processPayload(payload, referenceData);
}

function processPayload(payload, referenceData) {
    payload.value.forEach(item => {
        if (item.valueType === 'string') {
            replaceValue(item, referenceData)
        } else {
            processPayload(item, referenceData)
        }
    });
    return payload
}

function replaceValue(obj, referenceData) {
    let value = obj.value;
    let substituteVar = value.split('{').pop().split('}')[0];
    if (substituteVar in referenceData) {
        obj.value = obj.value.replace(`{${substituteVar}}`, referenceData[substituteVar])
    }
}