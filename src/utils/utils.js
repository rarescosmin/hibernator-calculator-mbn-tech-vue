export const create_UUID = () => {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });

    return uuid;
};

const factors = {
    min: {
        mult: '0.3625',
        exp: '2.6425',
    },
    max: {
        mult: '0.3354',
        exp: '2.7976',
    },
    avg: {
        mult: '0.3424',
        exp: '2.7315',
    }
};

export const  factorize = (l, mult, exp) => {
    return (
        new BigDecimal(mult)
            .multiply(new BigDecimal(
                Math.pow(
                    l,
                    exp
                )
            ))
    ).toString();
};

export const computeFactors = (length) => {
    let l = parseFloat(length);
    let min = factorize(l, factors.min.mult, factors.min.exp);
    let max = factorize(l, factors.max.mult, factors.max.exp);
    let avg = factorize(l, factors.avg.mult, factors.avg.exp);
    
    return { min, max, avg };
};

export const testos = (length, weight) => {
    let { min, max, avg } = computeFactors(length);

    let w = parseFloat(weight);

    if (w < parseFloat(min)) {
        return 0;
    }

    if (w <= parseFloat(avg)) {
        return 1;
    }

    if (w <= parseFloat(max)) {
        return 2;
    }

    return 3;
};

export const resultStatusMapper = [
    {
        text: 'UNDERWEIGHT',
        color: 'red',
        icon: 'fa-times',
        badge: 'badge-danger',
        panel: 'bg-danger',
    },
    {
        text: 'OPTIMAL WEIGHT',
        color: 'green',
        icon: 'fa-check',
        badge: 'badge-success',
        panel: 'bg-success',
    },
    {
        text: 'ABOVE OPTIMAL WEIGHT',
        color: 'orange',
        icon: 'fa-check',
        badge: 'badge-warning',
        panel: 'bg-warning',
    },
    {
        text: 'OVERWEIGHT',
        color: 'red',
        icon: 'fa-times',
        badge: 'badge-danger',
        panel: 'bg-danger',
    },
];

/**
 * converts wei to eth
 * @param {*} number 
 */
export const weiToEth = (number) => {
    return parseFloat(number * Math.pow(10, -18)).toFixed(3);
};

/**
 * converts eth to wei
 * @param {*} number 
 */
 export const ethToWei = (number) => {
    return BigInt(number * Math.pow(10, 18));
};
